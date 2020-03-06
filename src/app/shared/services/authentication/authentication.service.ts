import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { NewUserRequest } from '../../models/requests/NewUserRequest';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) { }

  createEmailUser(request: NewUserRequest): Observable<User> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(request.email, request.password)).pipe(
      this.createNewUser(request)
    );
  }


  private createNewUser(request: NewUserRequest) {
    return switchMap((credentials: firebase.auth.UserCredential) => {
      const user = this.createUserFromNewUserRequest(request, credentials.user.uid);
      return this.createNewUserDocument(user, credentials);
    });
  }

  private createNewUserDocument(user: User, credentials: firebase.auth.UserCredential): Observable<User> {
    return from(this.afStore.collection(environment.firebaseCollections.users.name).doc(credentials.user.uid).set(user)).pipe(
      mapTo(user)
    );
  }

  private createUserFromNewUserRequest(request: NewUserRequest, uid: string) {
    const user: User = {
      id: uid,
      email: request.email,
      username: request.username,
      imageUploadCount: 0
    };
    return user;
  }

}
