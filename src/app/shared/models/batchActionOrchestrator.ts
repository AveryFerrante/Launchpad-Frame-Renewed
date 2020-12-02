import { Observable, from } from 'rxjs';
import { DeleteBatchAction, SetBatchAction, UpdateBatchAction } from './batchAction';
import { WriteBatch, firestore } from './firebase-collections/firebaseTypes';

type BatchAction = DeleteBatchAction<object> | SetBatchAction<object> | UpdateBatchAction<object>;
export class BatchActionOrchestrator {
  private batch: WriteBatch;
  private actions: BatchAction[] = [];


  constructor() {
    this.batch = firestore.batch();
  }

  appendActions(...newActions: BatchAction[]): void {
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
