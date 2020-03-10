import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { BaseBatchAction } from '../../models/baseBatchAction';
import { mapTo } from 'rxjs/operators';

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

  executeBatchActionsWithDefinedReturnType<T>(batchActions: BaseBatchAction[], returnType: T): Observable<T> {
    return this.executeBatchActions(batchActions).pipe(mapTo(returnType));
  }
}
