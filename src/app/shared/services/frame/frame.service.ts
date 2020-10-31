import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FrameCollection, FrameImageSubCollection } from '../../models/firebase-collections/frameCollection';
import { CreateFrameImageRequest, CreateFrameRequest } from '../../models/requests/FrameRequests';
import { SetBatchAction } from '../../models/setBatchAction';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  constructor(private afStore: AngularFirestore) { }

  getFrameDocumentSetBatchAction(request: CreateFrameRequest): SetBatchAction {
    return { documentReference: this.getFrameDocumentReference(request.id).ref, data: request.data };
  }

  getFrameImageDocumentSetBatchAction(request: CreateFrameImageRequest): SetBatchAction {
    return { documentReference: this.getFrameImageDocumentReference(request.frameId, request.id).ref, data: request.data };
  }

  private getFrameDocumentReference(id: string) {
    return this.afStore.collection(environment.firebaseCollections.frames.name).doc<FrameCollection>(id);
  }

  private getFrameImageDocumentReference(frameId: string, frameImageId: string) {
    return this.getFrameDocumentReference(frameId)
               .collection(environment.firebaseCollections.frames.images.name)
               .doc<FrameImageSubCollection>(frameImageId);
  }
}
