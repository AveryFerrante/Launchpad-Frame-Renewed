import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FrameActions from './actions';
import { Observable, of, combineLatest, pipe, merge, Subject } from 'rxjs';
import { exhaustMap, map, mapTo, catchError, withLatestFrom, mergeMap, last, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FrameService } from 'src/app/shared/services/frame/frame.service';
import { BatchActionOrchestrator } from 'src/app/shared/models/batchActionOrchestrator';
import { FrameImageModel, FrameModel } from 'src/app/shared/models/view-models/frameModel';
import { FrameTranslator } from 'src/app/shared/models/translators/frameTranslator';
import { CreateFrameImageRequest, CreateFrameRequest } from 'src/app/shared/models/requests/frameRequests';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { Action, Store } from '@ngrx/store';
import { frameStateKey } from './state';
import { RootState } from '..';
import { authenticationPropertyKey } from '../state';
import { UploadImageResponse } from 'src/app/shared/models/uploadImageResponse';
import { UserTranslator } from 'src/app/shared/models/translators/userTranslator';
import { User } from 'src/app/shared/models/firebase-collections/user';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { ImageDeminsions } from 'src/app/shared/models/imageDeminsions';
import { QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';


@Injectable()
export class FrameStoreEffects {
    liveListenerCork$ = new Subject<boolean>();
    constructor(private actions$: Actions,
                private store$: Store<RootState>,
                private frameService: FrameService,
                private frameTranslator: FrameTranslator,
                private userTranslator: UserTranslator,
                private authenticationService: AuthenticationService,
                private alertService: AlertService) {}

    uploadImages$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.UploadImagesRequest),
      withLatestFrom(this.store$),
      map(([action, state]) => [action.Images, state]),
      this.handleImageUpload()
    ));

    createNewFrame$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.NewFrame.Request),
      withLatestFrom(this.store$),
      map(([action, state]) => this.frameService.getFrameRequest(state[authenticationPropertyKey].currentUser, action.request)),
      exhaustMap((request: CreateFrameRequest) => this.OrchestrateFrameCreation(request).pipe(
        map((frameModel: FrameModel) => FrameActions.NewFrame.RequestSuccess({ successResponse: frameModel })),
        catchError((error: Error) => of(FrameActions.NewFrame.RequestFailure({ failureResponse: error.message }))),
        tap({
          complete: () => this.alertService.alert({ message: 'New Frame Created!', type: 'success' }),
          error: () => this.alertService.alert({ message: 'Something Went Wrong!', type: 'error' })
        })
      ))
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
        takeUntil(this.liveListenerCork$.asObservable())
      )),
      map((newImages: FrameImageModel[]) => FrameActions.LiveImageListenerNewImages({ newImages })),
    ));

    liveImageListenerStop$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.LiveImageListenerStopRequest),
      tap(() => this.liveListenerCork$.next(true))
    ), { dispatch: false });

    joinFrame$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.JoinFrame.Request),
      mergeMap((action) => this.frameService.getFrameIdByAccessToken(action.request)),
      withLatestFrom(this.store$),
      this.joinFrameIfEligible()
    ));

    private handleImageUpload() {
      return pipe(
        mergeMap(([images, state]: [File[], RootState]) => {
          const userId = state[authenticationPropertyKey].currentUser.id;
          return this.frameService.uploadImages(images, userId).pipe(
            mergeMap((uploadResponses: UploadImageResponse[]) => {
              const actions$: Observable<Action>[] = this.createFrameImageOnUploadComplete(uploadResponses, state);
              actions$.push(this.createUploadPercentageTracker(uploadResponses));
              const plural = uploadResponses.length > 1 ? 's' : '';
              return merge(...actions$).pipe(
                tap({ complete: () => this.alertService.alert({ message: `Image${plural} Uploaded Successfully!`, type: 'success' }) })
              );
            })
          );
        })
      );
    }

    private createUploadPercentageTracker(uploads: UploadImageResponse[]): Observable<Action> {
      return combineLatest(...this.getUploadSnapshots(uploads)).pipe(
        map((combinedPercentages: number[]) => {
          const percentage = combinedPercentages.reduce((acc, curr) => acc + curr, 0) / combinedPercentages.length;
          return FrameActions.UpdateUploadPercentageRequest({ percentage: percentage >= 100 ? null : percentage });
        }),
      );
    }

    private getUploadSnapshots(uploads: UploadImageResponse[]): Observable<number>[] {
      return uploads.map(upload => upload.uploadTask.percentageChanges());
    }

    private createFrameImageOnUploadComplete(uploads: UploadImageResponse[], state: RootState): Observable<Action>[] {
      const username = state[authenticationPropertyKey].currentUser.username;
      const frameId = state[frameStateKey].selectedFrameId;
      const userId = state[authenticationPropertyKey].currentUser.id;
      return uploads.map((currentTask) => {
        return currentTask.uploadTask.snapshotChanges().pipe(
          last(),
          mergeMap(() => currentTask.imageReference.getDownloadURL()),
          this.mapToCreateImageRequest(userId, currentTask.storagePath, username, frameId, currentTask.deminsions)
        );
      });
    }

    private mapToCreateImageRequest(userId: string, storagePath: string, username: string, frameId: string, dems: ImageDeminsions) {
      return map((url: string) => {
        const request = {
          userId,
          downloadUrl: url,
          storagePath,
          username,
          dimensions: dems
        };
        const req = this.frameTranslator.GetCreateFrameImageRequest(frameId, request);
        return FrameActions.NewFrameImage.Request({ request: req });
      });
    }

    private OrchestrateFrameCreation(request: CreateFrameRequest) {
      const orchestrator = new BatchActionOrchestrator();
      const userFrame = this.userTranslator.CreateUserFrameMetadataFromCreateFrameRequest(request);
      orchestrator.appendActions(
        this.authenticationService.addFrameToUserUpdateBatchAction(userFrame, request.data.creator.userId),
        this.frameService.getFrameDocumentSetBatchAction(request)
      );
      return orchestrator.executeActions().pipe(
        mapTo(this.frameTranslator.CreateRequestToModel(request))
      );
    }

    private OrchestrateFrameImageCreation(request: CreateFrameImageRequest) {
      const orchestrator = new BatchActionOrchestrator();
      orchestrator.appendActions(this.frameService.getFrameImageDocumentSetBatchAction(request));
      return orchestrator.executeActions().pipe(
        mapTo(this.frameTranslator.CreateImageRequestToModel(request))
      );
    }

    private orchestrateJoiningFrame(frameDoc: QueryDocumentSnapshot<DocumentData>, user: User) {
      const orchestrator = new BatchActionOrchestrator();
      const userFrame = this.userTranslator.CreateUserFrameMetadataForJoiningFrame(frameDoc);
      orchestrator.appendActions(
        this.authenticationService.addFrameToUserUpdateBatchAction(userFrame, user.id),
        this.frameService.addParticipantToFrameUpdateBatchAction(frameDoc.id, user)
      );
      return orchestrator.executeActions().pipe(
        mapTo(userFrame)
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

    private joinFrameIfEligible() {
      return mergeMap(([queryResults, state]) => {
        if (queryResults.size < 1) {
          this.alertService.alert({ message: 'No frame found for that access key!', type: 'inform' });
          return of(FrameActions.JoinFrameNoOp());
        } else if (state[authenticationPropertyKey].currentUser.frames.find(f => f.frameId === queryResults.docs[0].id)) {
          this.alertService.alert({ message: 'You\'re already a participant!', type: 'inform' });
          return of(FrameActions.JoinFrameNoOp());
        } else {
          return this.orchestrateJoiningFrame(queryResults.docs[0], state[authenticationPropertyKey].currentUser).pipe(
            map((userFrame) => FrameActions.JoinFrame.RequestSuccess({ successResponse: userFrame })),
            catchError((error: Error) => of(FrameActions.JoinFrame.RequestFailure({ failureResponse: error.message })))
          );
        }
      });
    }
}
