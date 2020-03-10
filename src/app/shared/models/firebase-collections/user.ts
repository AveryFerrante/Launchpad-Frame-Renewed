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
