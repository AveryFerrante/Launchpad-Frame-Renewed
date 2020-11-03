import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { forkJoin, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FrameCollection, FrameImageSubCollection } from '../../models/firebase-collections/frameCollection';
import { CreateFrameImageRequest, CreateFrameRequest } from '../../models/requests/FrameRequests';
import { SetBatchAction } from '../../models/setBatchAction';
import { FrameTranslator } from '../../models/translators/frameTranslator';
import { UploadImageResponse } from '../../models/uploadImageResponse';
import { FrameModel } from '../../models/view-models/frameModel';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  constructor(private afStore: AngularFirestore, private frameTranslator: FrameTranslator, private afStorage: AngularFireStorage) { }

  loadFrame(id: string): Observable<FrameModel> {
    const frameDocument$ = this.getFrameDocumentReference(id).get();
    const frameImages$ = this.getFrameImageCollectionReference(id).get();
    return forkJoin(frameDocument$, frameImages$).pipe(
      map(([frameDocument, frameImages]) => {
        return this.frameTranslator.CreateFrameModel(frameDocument, frameImages);
      })
    );
  }

  uploadImage(image: File, path: string): UploadImageResponse {
    const ref = this.afStorage.ref(path);
    const headers = environment.imageUploadProperties.cacheControlValues.reduce((acc, curr, index, arr) => {
      return acc + curr + (index === arr.length - 1 ? '' : ', ');
    }, '');
    const response: UploadImageResponse = {
      imageReference: ref,
      uploadTask: this.afStorage.upload(path, image, { cacheControl: headers })
    };
    return response;
  }

  getFrameDocumentSetBatchAction(request: CreateFrameRequest): SetBatchAction {
    return { documentReference: this.getFrameDocumentReference(request.id).ref, data: request.data };
  }

  getFrameImageDocumentSetBatchAction(request: CreateFrameImageRequest): SetBatchAction {
    return { documentReference: this.getFrameImageDocumentReference(request.frameId, request.id).ref, data: request.data };
  }

  private getFrameDocumentReference(id: string) {
    return this.afStore.collection(environment.firebaseCollections.frames.name).doc<FrameCollection>(id);
  }

  private getFrameImageDocumentReference(frameId: string, frameImageId: string = null) {
    return this.getFrameImageCollectionReference(frameId).doc<FrameImageSubCollection>(frameImageId);
  }

  private getFrameImageCollectionReference(frameId: string) {
    return this.getFrameDocumentReference(frameId).collection<FrameImageSubCollection>(environment.firebaseCollections.frames.images.name);
  }
}
