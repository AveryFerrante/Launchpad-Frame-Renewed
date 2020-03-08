import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BatchAction, isDeleteAction, isUpdateAction } from '../../models/batchAction';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchHelperService {

  constructor(private afStore: AngularFirestore) { }

  executeBatch(batchActions: BatchAction[]): Observable<void> {
    const batch = this.afStore.firestore.batch();
    batchActions.forEach((action: BatchAction) => {
       if (isDeleteAction(action)) {
         batch.delete(action.documentReference);
       } else if (isUpdateAction(action)) {
         batch.update(action.documentReference, action.data);
       } else {
         batch.set(action.documentReference, action.data, action.options);
       }
    });
    return from(batch.commit());
  }
}
