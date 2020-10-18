import { AngularFirestoreDocument } from '@angular/fire/firestore';

export interface UpdateBatchAction {
  documentReference: AngularFirestoreDocument;
  data: firebase.firestore.DocumentData;
}
