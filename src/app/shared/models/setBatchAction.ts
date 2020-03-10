import { UpdateBatchAction } from './updateBatchAction';

export class SetBatchAction extends UpdateBatchAction {
  private options?: firebase.firestore.SetOptions;
  constructor(documentReference: firebase.firestore.DocumentReference<any>,
              data: firebase.firestore.UpdateData,
              options?: firebase.firestore.SetOptions) {
    super(documentReference, data);
    this.options = options;
  }

  attachActionToBatch(batch: firebase.firestore.WriteBatch) {
    batch.set(this.documentReference, this.data, this.options);
  }

}
