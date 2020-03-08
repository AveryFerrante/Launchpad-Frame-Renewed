import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { mapTo, switchMap, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { NewUserRequest } from '../../models/requests/NewUserRequest';
import { User } from '../../models/user';
import { BatchAction, SetBatchAction } from '../../models/batchAction';

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

  createUserDocumentBatchAction(userId: string, newUserRequest: NewUserRequest): BatchAction {
    const returnAction: SetBatchAction = {
      documentReference: this.getUserDocumentReference(userId),
      data: newUserRequest
    };
    return returnAction;
  }

  private getUserDocumentReference(docId: string) {
    return this.afStore.firestore.collection(environment.firebaseCollections.users.name).doc(docId);
  }

  private createUserFromNewUserRequest(request: NewUserRequest) {
    return map((credentials: firebase.auth.UserCredential) => {
      const user: User = {
        id: credentials.user.uid,
        email: request.email,
        username: request.username,
        imageUploadCount: 0
      };
      return user;
    });
  }

}
