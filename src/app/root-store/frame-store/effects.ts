import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FrameActions from './actions';
import { exhaustMap, map, mapTo } from 'rxjs/operators';
import { FrameService } from 'src/app/shared/services/frame/frame.service';
import { NewFrameRequest } from 'src/app/shared/models/requests/newFrameRequest';
import { BatchActionOrchestrator } from 'src/app/shared/models/batchActionOrchestrator';


@Injectable()
export class FrameStoreEffects {
    constructor(private actions$: Actions,
                private frameService: FrameService) {}

    createNewFrame$ = createEffect(() => this.actions$.pipe(
      ofType(FrameActions.NewFrame.Request),
      map((action) => action.request),
      exhaustMap((request: NewFrameRequest) => this.OrchestrateDocCreation(request)),
      map(() => FrameActions.NewFrame.RequestSuccess({ successResponse: null }))
    ));

    private OrchestrateDocCreation(request: NewFrameRequest) {
      const orchestrator = new BatchActionOrchestrator();
      const frame = this.frameService.getFrameObjectFromRequest(request);
      orchestrator.appendSetAction(this.frameService.getFrameDocumentSetBatchAction(frame));
      return orchestrator.executeActions().pipe(mapTo(frame));
    }
}
