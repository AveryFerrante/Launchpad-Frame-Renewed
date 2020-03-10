import { BaseBatchAction } from './baseBatchAction';

export class DeleteBatchAction extends BaseBatchAction {
  constructor(documentReference: firebase.firestore.DocumentReference<any>) {
    super(documentReference);
  }

  attachActionToBatch(batch: firebase.firestore.WriteBatch) {
    batch.delete(this.documentReference);
  }
}
