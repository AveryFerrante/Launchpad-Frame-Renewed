import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, OperatorFunction } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { SetBatchAction, UpdateBatchAction } from '../../models/batchAction';
import { createDefaultUser, UserFrameMetadata, User } from '../../models/firebase-collections/user';
import { NewUserRequest } from '../../models/view-models/NewUserRequest';
import { SignInRequest } from '../../models/view-models/signInRequest';
import { FirebaseUserCredential, DocumentSnapshot, FirebaseUser } from '../../models/firebase-collections/firebaseTypes';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) { }

  createEmailUser(request: NewUserRequest): Observable<User> {
    return from(this.afAuth.createUserWithEmailAndPassword(request.email, request.password)).pipe(
      this.createUserFromNewUserRequest(request)
    );
  }

  signInWithEmail(request: SignInRequest): Observable<FirebaseUserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(request.email, request.password));
  }

  getUserDocumentById(userId: string): Observable<User> {
    return from(this.getUserDocumentReference(userId).get()).pipe(
      this.mapDocumentToUser()
    );
  }

  getUserDocumentSetBatchAction(user: User): SetBatchAction<User> {
    return new SetBatchAction<User>(this.getUserDocumentReference(user.id).ref, user);
  }

  userIsSignedIn(): Observable<boolean> {
    return this.getCurrentSignedInUser().pipe(
      map((user: FirebaseUser) => user !== null)
    );
  }

  getCurrentSignedInUser(): Observable<FirebaseUser> {
    return this.afAuth.user.pipe(take(1));
  }

  signOutUser(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  addFrameToUserUpdateBatchAction(frame: UserFrameMetadata, userId: string): UpdateBatchAction<User> {
    return new UpdateBatchAction<User>(
      this.getUserDocumentReference(userId).ref,
      { frames: firebase.default.firestore.FieldValue.arrayUnion(frame) }
    );
  }

  private getUserDocumentReference(docId: string) {
    return this.afStore.collection<User>(environment.firebaseCollections.users.name).doc(docId);
  }

  private createUserFromNewUserRequest(request: NewUserRequest) {
    return map((credentials: FirebaseUserCredential) =>
      createDefaultUser(request.email, request.username, credentials.user.uid));
  }

  private mapDocumentToUser(): OperatorFunction<DocumentSnapshot<User>, User> {
    return map((userDocument: DocumentSnapshot<User>) => {
      if (userDocument.exists) {
        return userDocument.data();
      } else {
        throw new Error('No associated user document was found for the user id');
      }
    });
  }

}
