import { DocumentReference, DocumentData, SetOptions } from '@angular/fire/firestore';
import { FieldValue } from './firebase-collections/firebaseTypes';

abstract class BaseAction<T> {
  constructor(public documentReference: DocumentReference<T>) {  }
}

export class DeleteBatchAction<T> extends BaseAction<T> {
  constructor(documentReference: DocumentReference<T>) {
    super(documentReference);
  }
}

type SetData<T> = {
  [P in keyof T]: T[P];
};
export class SetBatchAction<T> extends BaseAction<T> {
  constructor(documentReference: DocumentReference<T>,
              public data: SetData<T>, public options?: SetOptions) {
    super(documentReference);
  }
}

type UpdateData<T> = {
  [P in keyof T]?: (DocumentData| FieldValue)
};
export class UpdateBatchAction<T> extends BaseAction<T> {
  constructor(documentReference: DocumentReference<T>, public data: UpdateData<T>) {
    super(documentReference);
  }
}
