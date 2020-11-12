import { Injectable } from '@angular/core';
import { FramePermissions } from '../constants/framePermissions';
import { UserFrameMetadata } from '../firebase-collections/user';
import { CreateFrameRequest } from '../requests/FrameRequests';

@Injectable()
export class UserTranslator {

  CreateUserFrameMetadataFromCreateFrameRequest(request: CreateFrameRequest) {
    const userFrame: UserFrameMetadata = {
      frameId: request.id,
      name: request.data.name,
      permissions: [FramePermissions.creator]
    };
    return userFrame;
  }

  CreateUserFrameMetadataForJoiningFrame(frameDoc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) {
    const userFrame: UserFrameMetadata = {
      frameId: frameDoc.id,
      name: frameDoc.data().name,
      permissions: [FramePermissions.contributor]
    };
    return userFrame;
  }
}
