import { AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

export interface UploadImageResponse {
  imageReference: AngularFireStorageReference;
  uploadTask: AngularFireUploadTask;
  storagePath: string;
}
