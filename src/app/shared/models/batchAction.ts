import { firestore } from 'firebase';

abstract class BaseAction {
  constructor(public documentReference: firebase.firestore.DocumentReference) {  }
}

export class DeleteBatchAction extends BaseAction {
  constructor(documentReference: firestore.DocumentReference<firestore.DocumentData>) {
    super( documentReference);
  }
}

type SetData<T> = {
  [P in keyof T]: T[P];
};
export class SetBatchAction<T> extends BaseAction {
  constructor(documentReference: firebase.firestore.DocumentReference,
              public data: SetData<T>, public options?: firebase.firestore.SetOptions) {
    super(documentReference);
  }
}

type UpdateData<T> = {
  [P in keyof T]?: (firebase.firestore.DocumentData | firestore.FieldValue)
};
export class UpdateBatchAction<T> extends BaseAction {
  constructor(documentReference: firebase.firestore.DocumentReference, public data: UpdateData<T>) {
    super(documentReference);
  }
}
