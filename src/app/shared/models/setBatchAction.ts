

export interface SetBatchAction{
  documentReference: firebase.firestore.DocumentReference;
  data: firebase.firestore.DocumentData;
  options?: firebase.firestore.SetOptions;
}
