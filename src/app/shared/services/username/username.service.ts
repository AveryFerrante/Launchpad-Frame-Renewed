import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn, CollectionReference } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Username } from '../../models/firebase-collections/username';
import { SetBatchAction } from '../../models/batchAction';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor(private afStore: AngularFirestore) { }

  getUsernameDocumentSetBatchAction(userId: string, username: string): SetBatchAction<Username> {
    const documentData = this.initializeUsernameDocumentData(userId, username);
    return new SetBatchAction<Username>(this.getNewUsernameDocumentReference(), documentData);
  }

  usernameExists(username: string): Observable<boolean> {
    username = this.trimUsername(username);
    const query: QueryFn = (ref: CollectionReference) => ref.where('usernameTrimmed', '==', username).limit(1);
    return this.afStore.collection(environment.firebaseCollections.usernames.name, query).get().pipe(
      map(data => !data.empty)
    );
  }

  private initializeUsernameDocumentData(userId: string, username: string): Username {
    return {
      userId,
      username,
      usernameTrimmed: this.trimUsername(username),
      usernamePermutations: this.getPermutations(username)
    };
  }

  private getNewUsernameDocumentReference() {
    return this.afStore.firestore
      .collection(environment.firebaseCollections.usernames.name)
      .doc();
  }

  private trimUsername(username: string): string {
    return username.toLowerCase().trim();
  }

  private getPermutations(username: string): string[] {
    username = this.trimUsername(username);
    const permutations = username.split('').reduce((accumulated: string[], currentValue: string, currentIndex: number) => {
      return currentIndex === 0 ? [currentValue] : [...accumulated, accumulated[accumulated.length - 1] + currentValue];
    }, []);
    return permutations.slice(2, permutations.length);
  }
}
