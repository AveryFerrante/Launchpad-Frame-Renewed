export interface User {
    id: string;
    email: string;
    username: string;
    frames: FrameMetadataForUser[];
    imageUploadCount: number;
}

interface FrameMetadataForUser {
  id: string;
  permissions: string[];
}

export function createDefaultUser(email: string, username: string, id: string): User {
  return {
    id,
    username,
    email,
    imageUploadCount: 0,
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
    imageUploadCount: documentData.imageUploadCount
  };
}


