import { FramePermissions } from '../constants/framePermissions';
import { DocumentSnapshot, DocumentData } from '@angular/fire/firestore';

export interface User {
    id: string;
    email: string;
    username: string;
    frames: UserFrameMetadata[];
    imageIds: string[];
}

export interface UserFrameMetadata {
  frameId: string;
  name: string;
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