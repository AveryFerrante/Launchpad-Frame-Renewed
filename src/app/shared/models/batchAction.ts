interface BaseBatchAction {
  documentReference: firebase.firestore.DocumentReference<any>;
}

type DeleteBatchAction = BaseBatchAction & { __typename: 'Delete' };

type UpdateBatchAction = BaseBatchAction & { __typename: 'Update', data: firebase.firestore.UpdateData };

type SetBatchAction = BaseBatchAction & { __typename: 'Set', data: firebase.firestore.UpdateData, options?: firebase.firestore.SetOptions };

export const getDeleteBatchAction = (documentReference: firebase.firestore.DocumentReference<any>): DeleteBatchAction => {
  return { __typename: 'Delete', documentReference };
};

export const getUpdateBatchAction = (documentReference: firebase.firestore.DocumentReference<any>,
                                     data: firebase.firestore.UpdateData): UpdateBatchAction => {
  return { __typename: 'Update', documentReference, data };
};

export const getSetBatchAction = (documentReference: firebase.firestore.DocumentReference<any>,
                                  data: firebase.firestore.UpdateData,
                                  options?: firebase.firestore.SetOptions): SetBatchAction => {
  return { __typename: 'Set', documentReference, data, options };
};

export type BatchAction = DeleteBatchAction | UpdateBatchAction | SetBatchAction;

export const isDeleteAction = (action: BatchAction): action is DeleteBatchAction => {
  return action.__typename === 'Delete';
};

export const isUpdateAction = (action: BatchAction): action is UpdateBatchAction => {
  return action.__typename === 'Update';
};

export const isSetAction = (action: BatchAction): action is SetBatchAction => {
  return action.__typename === 'Set';
};
