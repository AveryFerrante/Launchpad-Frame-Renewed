import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { createDefaultUser, createUserFromDocument, User } from '../../models/firebase-collections/user';
import { SetBatchAction } from '../../models/setBatchAction';
import { NewUserRequest } from '../../models/requests/NewUserRequest';
import { SignInRequest } from '../../models/requests/signInRequest';

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

  signInWithEmail(request: SignInRequest): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(request.email, request.password));
  }

  getUserDocumentById(userId: string): Observable<User> {
    return from(this.getUserDocumentReference(userId).get()).pipe(
      this.mapDocumentToUser()
    );
  }

  getUserDocumentSetBatchAction(user: User): SetBatchAction {
    return { documentReference: this.getUserDocumentReference(user.id).ref, data: user };
  }

  userIsSignedIn(): Observable<boolean> {
    return this.getCurrentSignedInUser().pipe(
      map((user: firebase.User) => user !== null)
    );
  }

  getCurrentSignedInUser(): Observable<firebase.User> {
    return this.afAuth.user.pipe(take(1));
  }

  signOutUser(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }

  private getUserDocumentReference(docId: string) {
    return this.afStore.collection(environment.firebaseCollections.users.name).doc<User>(docId);
  }

  private createUserFromNewUserRequest(request: NewUserRequest) {
    return map((credentials: firebase.auth.UserCredential) =>
      createDefaultUser(request.email, request.username, credentials.user.uid));
  }

  private mapDocumentToUser() {
    return map((userDocument: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) => {
      if (userDocument.exists) {
        return createUserFromDocument(userDocument);
      } else {
        throw new Error('No associated user document was found for the user id');
      }
    });
  }

}
