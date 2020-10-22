import { FramePermissions } from '../constants/framePermissions';

export interface User {
    id: string;
    email: string;
    username: string;
    frames: FrameMetadataForUser[];
    imageIds: string[];
}

interface FrameMetadataForUser {
  id: string;
  frameId: string;
  permissions: FramePermissions[];
}

export function createDefaultUser(email: string, username: string, id: string): User {
  return {
    id,
    username,
    email,
    imageIds: [],
    frames: []
  };
}

export function createUserFromDocument(doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): User {
  const documentData = doc.data();
  return {
    id: doc.id,
    email: documentData.email,
    username: documentData.username,
    frames: documentData.frames,
    imageIds: documentData.imageIds
  };
}


