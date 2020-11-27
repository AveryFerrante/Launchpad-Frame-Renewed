import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { FrameCollection, FrameImageSubCollection } from '../firebase-collections/frameCollection';
import { CreateFrameImageRequest, CreateFrameRequest } from '../requests/FrameRequests';
import { FrameImageModel, FrameModel } from '../view-models/frameModel';

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
    return imagesCollection.reduce(ReduceToImageModel, []);
  }
}

const ReduceToImageModel = (acc: FrameImageModel[], current: QueryDocumentSnapshot<FrameImageSubCollection>) => {
  const frameImage: FrameImageModel = {
    id: current.id,
    ...current.data()
  };
  return [...acc, frameImage];
};

