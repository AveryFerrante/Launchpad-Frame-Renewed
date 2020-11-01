import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FrameActions from './actions';
import { of, combineLatest } from 'rxjs';
import { exhaustMap, map, mapTo, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import { FrameService } from 'src/app/shared/services/frame/frame.service';
import { BatchActionOrchestrator } from 'src/app/shared/models/batchActionOrchestrator';
import { FrameImageModel, FrameModel } from 'src/app/shared/models/view-models/frameModel';
import { FrameTranslator } from 'src/app/shared/models/translators/frameTranslator';
import { CreateFrameImageRequest, CreateFrameRequest } from 'src/app/shared/models/requests/FrameRequests';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { Store } from '@ngrx/store';
import { FrameState, stateKey } from './state';
import { RootState } from '..';


@Injectable()
export class FrameStoreEffects {
    constructor(private actions$: Actions,
                private store$: Store<RootState>,
                private frameService: FrameService,
                private frameTranslator: FrameTranslator,
                private authenticationService: AuthenticationService) {}

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
      exhaustMap((request: CreateFrameImageRequest) => this.OrchestrateFrameImageCreation(request)),
      map((frameImageModel: FrameImageModel) => FrameActions.NewFrameImage.RequestSuccess({ successResponse: frameImageModel })),
      catchError((error: Error) => of(FrameActions.NewFrameImage.RequestFailure({ failureResponse: error.message })))
    ));

    frameSelect$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.SelectFrame.Request),
      withLatestFrom(this.store$),
      map(([action, state]) => {
        const frameId = action.request;
        if (state[stateKey].frames.find(f => f.id === frameId) === undefined) {
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
