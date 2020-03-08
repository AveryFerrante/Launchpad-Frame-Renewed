export interface DeleteBatchAction {
  documentReference: firebase.firestore.DocumentReference<any>;
}

export interface UpdateBatchAction extends DeleteBatchAction {
  data: firebase.firestore.UpdateData;
}

export interface SetBatchAction extends UpdateBatchAction {
  options?: firebase.firestore.SetOptions;
}

export type BatchAction = DeleteBatchAction | UpdateBatchAction | SetBatchAction;
