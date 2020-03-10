import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { BaseBatchAction } from '../../models/baseBatchAction';

@Injectable({
  providedIn: 'root'
})
export class BatchHelperService {

  constructor(private afStore: AngularFirestore) { }

  executeBatchActions(batchActions: BaseBatchAction[]): Observable<void> {
    const batch = this.afStore.firestore.batch();
    batchActions.forEach(action => action.attachActionToBatch(batch));
    return from(batch.commit());
  }
}
