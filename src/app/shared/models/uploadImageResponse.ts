import { AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { ImageDeminsions } from './imageDeminsions';

export interface UploadImageResponse {
  imageReference: AngularFireStorageReference;
  uploadTask: AngularFireUploadTask;
  storagePath: string;
  deminsions: ImageDeminsions;
}
