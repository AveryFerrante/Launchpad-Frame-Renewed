import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BatchAction, SetBatchAction, UpdateBatchAction, DeleteBatchAction } from '../../models/batchAction';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchHelperService {

  constructor(private afStore: AngularFirestore) { }

  executeBatch(batchActions: BatchAction[]): Observable<void> {
    const batch = this.afStore.firestore.batch();
    batchActions.forEach((action: BatchAction) => {
      // HOW DO I RESOLVE THE TYPE HERE?
    });
    return from(batch.commit());
  }
}
