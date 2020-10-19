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

  appendSetAction(...actions: SetBatchAction[]) {
    this.setActions.concat(actions);
  }

  appendUpdateAction(...actions: UpdateBatchAction[]) {
    this.updateActions.concat(actions);
  }

  appendDeleteAction(...actions: DeleteBatchAction[]) {
    this.deleteActions.concat(actions);
  }

  executeActions(): Observable<void> {
    this.attachSetAction();
    this.attachUpdateAction();
    this.attachDeleteAction();
    return from(this.batch.commit());
  }

  private attachSetAction() {
    this.setActions.forEach(action => this.batch.set(action.documentReference, action.data, action.options));
  }

  private attachUpdateAction() {
    this.updateActions.forEach(action => this.batch.update(action.documentReference, action.data));
  }

  private attachDeleteAction() {
    this.deleteActions.forEach(action => this.batch.delete(action.documentReference));
  }

}
