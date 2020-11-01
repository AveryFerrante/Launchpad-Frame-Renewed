import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
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

  CreateFrameModel(frameDoc: firebase.firestore.DocumentSnapshot<DocumentData>,
                   imagesCollection: firebase.firestore.QuerySnapshot<DocumentData>): FrameModel {
    const frameDocData = frameDoc.data();
    const imagesCollectionData = imagesCollection.docs;

    return {
      id: frameDoc.id,
      name: frameDocData.name,
      creator: frameDocData.creator,
      participants: frameDocData.participants,
      images: imagesCollectionData.reduce(ReduceToImageModel, [])
    };
  }
}

const ReduceToImageModel = (acc, current) => {
  const docData = current.data();
  const frameImage: FrameImageModel = {
    id: current.id,
    userId: docData.userId,
    username: docData.username,
    downloadUrl: docData.downloadUrl,
    storagePath: docData.storagePath
  };
  return [...acc, frameImage];
};

