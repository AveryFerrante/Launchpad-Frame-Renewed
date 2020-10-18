import { SetBatchAction } from './setBatchAction';
import { DeleteBatchAction } from './deleteBatchAction';
import { UpdateBatchAction } from './updateBatchAction';
import { firestore } from 'firebase';
import { Observable, from } from 'rxjs';

export class BatchActionOrchestrator {
  private batch: firebase.firestore.WriteBatch;
  private setActions: SetBatchAction[];
  private deleteActions: DeleteBatchAction[];
  private updateActions: UpdateBatchAction[];


  constructor() {
    this.batch = firestore().batch();
    this.setActions = [];
    this.deleteActions = [];
    this.updateActions = [];
  }

  appendSetAction(action: SetBatchAction) {
    this.setActions.push(action);
  }

  appendUpdateAction(action: UpdateBatchAction) {
    this.updateActions.push(action);
  }

  appendDeleteAction(action: DeleteBatchAction) {
    this.deleteActions.push(action);
  }

  executeActions(): Observable<void> {
    this.attachSetAction();
    this.attachUpdateAction();
    this.attachDeleteAction();
    return from(this.batch.commit());
  }

  private attachSetAction() {
    this.setActions.forEach(action => this.batch.set(action.documentReference.ref, action.data, action.options));
  }

  private attachUpdateAction() {
    this.updateActions.forEach(action => this.batch.update(action.documentReference.ref, action.data));
  }

  private attachDeleteAction() {
    this.deleteActions.forEach(action => this.batch.delete(action.documentReference.ref));
  }

}
