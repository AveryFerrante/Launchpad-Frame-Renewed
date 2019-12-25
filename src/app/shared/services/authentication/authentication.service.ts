import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/user';
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'
import { NewUserRequest } from '../../models/requests/NewUserRequest';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) { }

  createEmailUser(request: NewUserRequest): Observable<User> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(request.email, request.password)).pipe(
      this.createNewUser(request)
    )
  }


  private createNewUser(request: NewUserRequest) {
    return switchMap((credentials: firebase.auth.UserCredential) => {
      let user = this.createUserFromNewUserRequest(request);
      return this.createNewUserDocument(user, credentials)
    })
  }

  private createNewUserDocument(user: User, credentials: firebase.auth.UserCredential): Observable<User> {
    return from(this.afStore.collection(environment.firebaseCollections.users.name).doc(credentials.user.uid).set(user)).pipe(
      this.mapToUserWithUserId(user, credentials.user.uid)
    );
  }

  private mapToUserWithUserId(user: User, uid: string) {
    return map(() => {
      user.id = uid;
      return user;
    });
  }

  private createUserFromNewUserRequest(request: NewUserRequest) {
    let user: User = {
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      username: request.username,
      imageUploadCount: 0
    };
    return user;
  }

}
