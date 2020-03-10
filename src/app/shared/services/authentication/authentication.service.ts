import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/firebase-collections/user';
import { SetBatchAction } from '../../models/setBatchAction';
import { NewUserRequest } from '../../models/requests/NewUserRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) { }

  createEmailUser(request: NewUserRequest): Observable<User> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(request.email, request.password)).pipe(
      this.createUserFromNewUserRequest(request)
    );
  }

  getUserDocumentSetBatchAction(user: User): SetBatchAction {
    return new SetBatchAction(this.getUserDocumentReference(user.id), user);
  }

  private getUserDocumentReference(docId: string) {
    return this.afStore.firestore.collection(environment.firebaseCollections.users.name).doc(docId);
  }

  private createUserFromNewUserRequest(request: NewUserRequest) {
    return map((credentials: firebase.auth.UserCredential) => {
      const user: User = {
        id: credentials.user.uid,
        ...request
      };
      return user;
    });
  }

}
