import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { FrameCollection, FrameImageSubCollection } from '../firebase-collections/frameCollection';
import { CreateFrameImageRequest, CreateFrameRequest } from '../requests/FrameRequests';
import { FrameImageModel, FrameModel } from '../view-models/frameModel';
import { DocumentSnapshot } from '../firebase-collections/firebaseTypes';

@Injectable()
export class FrameTranslator {
  constructor(private afStore: AngularFirestore) { }

  GetCreateFrameRequest(frame: FrameCollection): CreateFrameRequest {
    const request: CreateFrameRequest = {
      data: frame,
      id: this.afStore.createId()
    };
    return request;
  }

  GetCreateFrameImageRequest(frameId: string, frameImage: FrameImageSubCollection): CreateFrameImageRequest {
    return {
      frameId,
      id: this.afStore.createId(),
      data: frameImage
    };
  }

  CreateRequestToModel(frameRequest: CreateFrameRequest): FrameModel {
    return {
      ...frameRequest,
      ...frameRequest.data,
      images: []
    };
  }

  CreateImageRequestToModel(frameImgeRequest: CreateFrameImageRequest): FrameImageModel {
    return {
      id: frameImgeRequest.id,
      ...frameImgeRequest.data
    };
  }

  CreateFrameModel(frameDoc: DocumentSnapshot<FrameCollection>,
                   imagesCollection: QueryDocumentSnapshot<FrameImageSubCollection>[]): FrameModel {
    return {
      ...frameDoc.data(),
      id: frameDoc.id,
      images: this.CreateImageModels(imagesCollection)
    };
  }

  CreateImageModels(imagesCollection: QueryDocumentSnapshot<FrameImageSubCollection>[]) {
    return imagesCollection.map((doc: QueryDocumentSnapshot<FrameImageSubCollection>) => 
      ({
        id: doc.id,
        ...doc.data()
      }));
  }
}

