export abstract class BaseBatchAction {
  documentReference: firebase.firestore.DocumentReference<any>;

  abstract attachActionToBatch(batch: firebase.firestore.WriteBatch);

  constructor(documentReference: firebase.firestore.DocumentReference<any>) {
    this.documentReference = documentReference;
  }
}
