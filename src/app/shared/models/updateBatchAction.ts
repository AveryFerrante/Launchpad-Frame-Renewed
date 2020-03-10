import { BaseBatchAction } from './baseBatchAction';

export class UpdateBatchAction extends BaseBatchAction {
  protected data: firebase.firestore.UpdateData;
  constructor(documentReference: firebase.firestore.DocumentReference<any>, data: firebase.firestore.UpdateData) {
    super(documentReference);
    this.data = data;
  }

  attachActionToBatch(batch: firebase.firestore.WriteBatch) {
    batch.update(this.documentReference, this.data);
  }
}
