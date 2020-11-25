import { firestore } from 'firebase';
import { Observable, from } from 'rxjs';
import { DeleteBatchAction, SetBatchAction, UpdateBatchAction } from './batchAction';

type BatchAction = DeleteBatchAction | SetBatchAction<any> | UpdateBatchAction<any>;
export class BatchActionOrchestrator {
  private batch: firebase.firestore.WriteBatch;
  private actions: BatchAction[] = [];


  constructor() {
    this.batch = firestore().batch();
  }

  appendActions(...newActions: BatchAction[]) {
    this.actions = [...this.actions, ...newActions];
  }

  executeActions(): Observable<void> {
    this.resolveActionTypes();
    return from(this.batch.commit());
  }

  private resolveActionTypes() {
    this.actions.forEach(action => {
      if (action instanceof SetBatchAction) {
        this.batch.set(action.documentReference, action.data, action.options);
      } else if (action instanceof UpdateBatchAction) {
        this.batch.update(action.documentReference, action.data);
      } else if (action instanceof DeleteBatchAction) {
        this.batch.delete(action.documentReference);
      } else {
        console.error('Action is not of any BatchAction class type', action);
        throw new Error('Action is not of any BatchAction class type');
      }
    });
  }
}
