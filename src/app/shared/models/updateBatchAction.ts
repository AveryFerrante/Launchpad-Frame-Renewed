import { AngularFirestoreDocument } from '@angular/fire/firestore';

export interface UpdateBatchAction {
  documentReference: firebase.firestore.DocumentReference;
  data: firebase.firestore.DocumentData;
}
