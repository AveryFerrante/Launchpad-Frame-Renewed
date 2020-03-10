
export interface UpdateBatchAction {
  documentReference: firebase.firestore.DocumentReference;
  data: firebase.firestore.DocumentData;
}
