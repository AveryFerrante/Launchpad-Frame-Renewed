import { DocumentReference, DocumentData, SetOptions } from '@angular/fire/firestore';
type FieldValue = firebase.default.firestore.FieldValue;

abstract class BaseAction {
  constructor(public documentReference: DocumentReference) {  }
}

export class DeleteBatchAction extends BaseAction {
  constructor(documentReference: DocumentReference<DocumentData>) {
    super( documentReference);
  }
}

type SetData<T> = {
  [P in keyof T]: T[P];
};
export class SetBatchAction<T> extends BaseAction {
  constructor(documentReference: DocumentReference,
              public data: SetData<T>, public options?: SetOptions) {
    super(documentReference);
  }
}

type UpdateData<T> = {
  [P in keyof T]?: (DocumentData | FieldValue)
};
export class UpdateBatchAction<T> extends BaseAction {
  constructor(documentReference: DocumentReference, public data: UpdateData<T>) {
    super(documentReference);
  }
}
