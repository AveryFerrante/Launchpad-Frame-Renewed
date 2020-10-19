import { AngularFirestoreDocument } from '@angular/fire/firestore';

export interface DeleteBatchAction {
  documentReference: firebase.firestore.DocumentReference;
}
