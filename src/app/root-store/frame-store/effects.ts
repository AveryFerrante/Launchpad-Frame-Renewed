import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FrameActions from './actions';
import { Observable, of, combineLatest, pipe, merge, Subject } from 'rxjs';
import { exhaustMap, map, mapTo, catchError, withLatestFrom, mergeMap, last, switchMap, takeUntil, tap, finalize } from 'rxjs/operators';
import { FrameService } from 'src/app/shared/services/frame/frame.service';
import { BatchActionOrchestrator } from 'src/app/shared/models/batchActionOrchestrator';
import { FrameImageModel, FrameModel } from 'src/app/shared/models/view-models/frameModel';
import { FrameTranslator } from 'src/app/shared/models/translators/frameTranslator';
import { CreateFrameImageRequest, CreateFrameRequest } from 'src/app/shared/models/requests/FrameRequests';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { Action, Store } from '@ngrx/store';
import { frameStateKey } from './state';
import { RootState } from '..';
import { authenticationPropertyKey } from '../state';
import { UploadImageResponse } from 'src/app/shared/models/uploadImageResponse';
import { FrameCollection } from 'src/app/shared/models/firebase-collections/frameCollection';


@Injectable()
export class FrameStoreEffects {
    liveListenerCork$ = new Subject<boolean>();
    constructor(private actions$: Actions,
                private store$: Store<RootState>,
                private frameService: FrameService,
                private frameTranslator: FrameTranslator,
                private authenticationService: AuthenticationService) {}

    uploadImages$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.UploadImagesRequest),
      withLatestFrom(this.store$),
      map(([action, state]) => [action.Images, state]),
      this.handleImageUpload()
    ));

    createNewFrame$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.NewFrame.Request),
      withLatestFrom(this.store$),
      map(([action, state]) => this.mapToCreateFrameRequest(action.request, state)),
      exhaustMap((request: CreateFrameRequest) => this.OrchestrateFrameCreation(request)),
      map((frameModel: FrameModel) => FrameActions.NewFrame.RequestSuccess({ successResponse: frameModel })),
      catchError((error: Error) => of(FrameActions.NewFrame.RequestFailure({ failureResponse: error.message })))
    ));

    createNewFrameImage$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.NewFrameImage.Request),
      map((action) => action.request),
      mergeMap((request: CreateFrameImageRequest) => this.OrchestrateFrameImageCreation(request)),
      map((frameImageModel: FrameImageModel) => FrameActions.NewFrameImage.RequestSuccess({ successResponse: frameImageModel })),
      catchError((error: Error) => of(FrameActions.NewFrameImage.RequestFailure({ failureResponse: error.message })))
    ));

    frameSelect$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.SelectFrame.Request),
      withLatestFrom(this.store$),
      map(([action, state]) => {
        const frameId = action.request;
        if (state[frameStateKey].frames.find(f => f.id === frameId) === undefined) {
          return FrameActions.LoadFrame.Request({ request: frameId });
        } else {
          return FrameActions.SelectFrame.RequestSuccess({ successResponse: frameId });
        }
      }),
      catchError((error: Error) => of(FrameActions.SelectFrame.RequestFailure({ failureResponse: error.message })))
    ));

    loadFrame$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.LoadFrame.Request),
      map((action) => action.request),
      mergeMap((frameId: string) => this.frameService.loadFrame(frameId)),
      map((frame: FrameModel) => FrameActions.LoadFrame.RequestSuccess({ successResponse: frame })),
      catchError((error: Error) => of(FrameActions.LoadFrame.RequestFailure({ failureResponse: error.message })))
    ));

    liveImageListener$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.LiveImageListenerRequest),
      withLatestFrom(this.store$),
      map(([_, state]) => state[frameStateKey].selectedFrameId),
      switchMap((frameId: string) => this.frameService.getLiveImageListener(frameId).pipe(
        // Hack since bug in AngularFire doesn't give proper update type (i.e. added) on SnapshotChanges()...
        this.getOnlyNewImages(),
      )),
      map((newImages: FrameImageModel[]) => FrameActions.LiveImageListenerNewImages({ newImages })),
    ));

    liveImageListenerStop$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.LiveImageListenerStopRequest),
      tap(() => this.liveListenerCork$.next(true))
    ), { dispatch: false });

    private mapToCreateFrameRequest(frameName: string, state: RootState): CreateFrameRequest {
      const currentUser = state[authenticationPropertyKey].currentUser;
      const frame: FrameCollection = {
        name: frameName,
        creator: {
          userId: currentUser.id,
          usesrname: currentUser.username
        },
        participants: []
      };
      return this.frameTranslator.GetCreateFrameRequest(frame);
    }

    private handleImageUpload() {
      return pipe(
        mergeMap(([images, state]: [File[], RootState]) => {
          const userId = state[authenticationPropertyKey].currentUser.id;
          const uploads = this.frameService.uploadImages(images, userId);
          const actions$: Observable<Action>[] = this.createFrameImageOnUploadComplete(uploads, state);
          actions$.push(this.createUploadPercentageTracker(uploads));
          return merge(...actions$);
        })
      );
    }

    private createUploadPercentageTracker(uploads: UploadImageResponse[]): Observable<Action> {
      return combineLatest(...this.getUploadSnapshots(uploads)).pipe(
        map((combinedPercentages: number[]) => {
          const percentage = combinedPercentages.reduce((acc, curr) => acc + curr, 0) / combinedPercentages.length;
          return FrameActions.UpdateUploadPercentageRequest({ percentage: percentage === 100 ? null : percentage });
        }),
      );
    }

    private getUploadSnapshots(uploads: UploadImageResponse[]): Observable<number>[] {
      return uploads.reduce((acc, curr) => [...acc, curr.uploadTask.percentageChanges()], []);
    }

    private createFrameImageOnUploadComplete(uploads: UploadImageResponse[], state: RootState): Observable<Action>[] {
      const username = state[authenticationPropertyKey].currentUser.username;
      const frameId = state[frameStateKey].selectedFrameId;
      const userId = state[authenticationPropertyKey].currentUser.id;
      return uploads.reduce((acc, currentTask) => {
        const action = currentTask.uploadTask.snapshotChanges().pipe(
          last(),
          mergeMap(() => currentTask.imageReference.getDownloadURL()),
          this.mapToCreateImageRequest(userId, currentTask.storagePath, username, frameId)
        );
        return [...acc, action];
      }, []);
    }

    private mapToCreateImageRequest(userId: string, storagePath: string, username: string, frameId: string) {
      return map((url: string) => {
        const request = {
          userId,
          downloadUrl: url,
          storagePath,
          username
        };
        const req = this.frameTranslator.GetCreateFrameImageRequest(frameId, request);
        return FrameActions.NewFrameImage.Request({ request: req });
      });
    }

    private OrchestrateFrameCreation(request: CreateFrameRequest) {
      const orchestrator = new BatchActionOrchestrator();
      orchestrator.appendSetAction(this.frameService.getFrameDocumentSetBatchAction(request));
      orchestrator.appendUpdateAction(this.authenticationService.getUserFrameUpdateBatchAction(request));
      return orchestrator.executeActions().pipe(
        mapTo(this.frameTranslator.CreateRequestToModel(request))
      );
    }

    private OrchestrateFrameImageCreation(request: CreateFrameImageRequest) {
      const orchestrator = new BatchActionOrchestrator();
      orchestrator.appendSetAction(this.frameService.getFrameImageDocumentSetBatchAction(request));
      return orchestrator.executeActions().pipe(
        mapTo(this.frameTranslator.CreateImageRequestToModel(request))
      );
    }

    private getOnlyNewImages() {
      return pipe(
        withLatestFrom(this.store$),
        map(([images, state]: [FrameImageModel[], RootState]) => {
          const selectedFrameId = state[frameStateKey].selectedFrameId;
          const currentFrameImages = state[frameStateKey].frames.find(f => f.id === selectedFrameId).images;
          const currentFrameImageIds = currentFrameImages.map(i => i.id);
          return images.filter(i => !currentFrameImageIds.includes(i.id));
        })
      );
    }
}
