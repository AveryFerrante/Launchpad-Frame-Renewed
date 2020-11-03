import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FrameActions from './actions';
import { Observable, of, combineLatest } from 'rxjs';
import { exhaustMap, map, mapTo, catchError, withLatestFrom, mergeMap, tap, finalize, last, delay } from 'rxjs/operators';
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
import { validateBasis } from '@angular/flex-layout';


@Injectable()
export class FrameStoreEffects {
    constructor(private actions$: Actions,
                private store$: Store<RootState>,
                private frameService: FrameService,
                private frameTranslator: FrameTranslator,
                private authenticationService: AuthenticationService) {}

    uploadImages$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.UploadImagesRequest),
      withLatestFrom(this.store$),
      map(([action, state]) => [action.Images, state]),
      mergeMap(([images, state]: [File[], RootState]) => {
        const userId = state[authenticationPropertyKey].currentUser.id;
        const username = state[authenticationPropertyKey].currentUser.username;
        const uploads = this.frameService.uploadImages(images, userId);
        const frameId = state[frameStateKey].selectedFrameId;
        const start: Observable<Action>[] = [];
        uploads.forEach((curr) => {
          const action = curr.uploadTask.snapshotChanges().pipe(
            last(),
            mergeMap(() => curr.imageReference.getDownloadURL()),
            map((url: string) => {
              const request = {
                userId,
                downloadUrl: url,
                storagePath: curr.storagePath,
                username
              };
              const req = this.frameTranslator.GetCreateFrameImageRequest(frameId, request);
              return FrameActions.NewFrameImage.Request({ request: req });
            })
          );
          start.push(action);
        });
        const uploadPercentage$ = combineLatest(...uploads.reduce((acc, curr) => [...acc, curr.uploadTask.percentageChanges()], [])).pipe(
          map((combinedPercentages) => {
            const percentage = combinedPercentages.reduce((acc, curr) => acc + curr, 0) / combinedPercentages.length;
            return FrameActions.UpdateUploadPercentageRequest({ percentage: percentage === 100 ? null : percentage });
          }),
        );
        start.push(uploadPercentage$);
        return start;
      }),
      mergeMap((a) => a)
    ));

    createNewFrame$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.NewFrame.Request),
      map((action) => action.request),
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
}
