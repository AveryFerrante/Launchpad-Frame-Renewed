import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BatchAction, getSetBatchAction } from '../../models/batchAction';
import { environment } from 'src/environments/environment';
import { NewUsernameRequest } from '../../models/requests/newUsernameRequest';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor(private afStore: AngularFirestore) { }

  createUsernameDocumentBatchAction(userId: string, username: string): BatchAction {
    const data: NewUsernameRequest = {
      userId,
      username,
      usernameTrimmed: this.trimUsername(username),
      usernamePermutations: this.getPermutations(username)
    };
    return getSetBatchAction(this.getUsernameDocumentReference(), data);
  }

  private getUsernameDocumentReference(): firebase.firestore.DocumentReference {
    return this.afStore.firestore.collection(environment.firebaseCollections.usernames.name).doc();
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
