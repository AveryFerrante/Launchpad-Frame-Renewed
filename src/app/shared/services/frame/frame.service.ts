import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { createNewFrameRequest, Frame } from '../../models/firebase-collections/frame';
import { NewFrameRequest } from '../../models/requests/newFrameRequest';
import { SetBatchAction } from '../../models/setBatchAction';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  constructor(private afStore: AngularFirestore) { }

  getFrameObjectFromRequest(request: NewFrameRequest) {
    return createNewFrameRequest(this.afStore.createId(), request.name);
  }

  getFrameDocumentSetBatchAction(frame: Frame): SetBatchAction {
    return { documentReference: this.getFrameDocumentReference(frame.id).ref, data: frame };
  }

  private getFrameDocumentReference(id: string) {
    return this.afStore.collection(environment.firebaseCollections.frames.name).doc<Frame>(id);
  }
}
