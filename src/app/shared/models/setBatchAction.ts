import { AngularFirestoreDocument } from '@angular/fire/firestore';


export interface SetBatchAction {
  documentReference: AngularFirestoreDocument;
  data: firebase.firestore.DocumentData;
  options?: firebase.firestore.SetOptions;
}
