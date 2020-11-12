import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { firestore } from 'firebase';
import { forkJoin, from, Observable, of } from 'rxjs';
import { filter, finalize, map, skip, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FramePermissions } from '../../models/constants/framePermissions';
import { FrameAccessToken, FrameCollection, FrameImageSubCollection, FrameUser } from '../../models/firebase-collections/frameCollection';
import { User, UserFrameMetadata } from '../../models/firebase-collections/user';
import { CreateFrameImageRequest, CreateFrameRequest } from '../../models/requests/FrameRequests';
import { SetBatchAction } from '../../models/setBatchAction';
import { FrameTranslator } from '../../models/translators/frameTranslator';
import { UpdateBatchAction } from '../../models/updateBatchAction';
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
        return this.frameTranslator.CreateFrameModel(frameDocument, frameImages.docs);
      })
    );
  }

  uploadImages(images: File[], userId: string) {
    const imageUploads: UploadImageResponse[] = [];
    const headers = environment.imageUploadProperties.cacheControlValues.reduce((acc, curr, index, arr) => {
      return acc + curr + (index === arr.length - 1 ? '' : ', ');
    }, '');
    images.forEach(image => {
      const path = userId + '/' + new Date().toUTCString() + '-' + image.name;
      const ref = this.afStorage.ref(path);
      const task = this.afStorage.upload(path, image, { cacheControl: headers });
      imageUploads.push({ imageReference: ref, uploadTask: task, storagePath: path });
    });
    return imageUploads;
  }

  getLiveImageListener(frameId: string) {
    // Want to use something like map((documentChanges) => documentChanges.filter(dc => dc.type === 'added'))
    // Looking at the GitHub for AngularFire, there seems to be an open bug around the type returned from QuerySnapshot
    // Have to let the effect use the current state to determine which docs are new
    return this.getFrameImageCollectionReference(frameId).snapshotChanges().pipe(
      skip(1),
      map((documentsAdded) => documentsAdded.map(da => da.payload.doc)),
      map((queryDocuments) => this.frameTranslator.CreateImageModels(queryDocuments))
    );
  }

  getFrameIdByAccessToken(accessToken: string) {
    const query = this.getFrameCollectionReference().ref
      .where('accessToken.token', '==', accessToken.toUpperCase())
      .limit(1)
      .get();
    return from(query);
  }

  getFrameRequest(currentUser: User, frameName: string): CreateFrameRequest {
    const frame: FrameCollection = {
      name: frameName,
      creator: {
        userId: currentUser.id,
        usesrname: currentUser.username
      },
      participants: [],
      accessToken: this.getFrameAccessToken()
    };
    return this.frameTranslator.GetCreateFrameRequest(frame);
  }

  getFrameDocumentSetBatchAction(request: CreateFrameRequest): SetBatchAction {
    return { documentReference: this.getFrameDocumentReference(request.id).ref, data: request.data };
  }

  getFrameImageDocumentSetBatchAction(request: CreateFrameImageRequest): SetBatchAction {
    return { documentReference: this.getFrameImageDocumentReference(request.frameId, request.id).ref, data: request.data };
  }

  addParticipantToFrameUpdateBatchAction(frameId: string, user: User): UpdateBatchAction {
    const frameParticipant: FrameUser = {
      userId: user.id,
      usesrname: user.username
    };
    return {
      documentReference: this.getFrameDocumentReference(frameId).ref,
      data: { participants: firestore.FieldValue.arrayUnion(frameParticipant) }
    };
  }

  private getFrameAccessToken(): FrameAccessToken {
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 60);
    return {
      token: (Math.random() * 1e64).toString(36).substr(0, 6).toUpperCase(),
      expiresUtc: expiresDate.toUTCString()
    };
  }

  private getFrameCollectionReference() {
    return this.afStore.collection(environment.firebaseCollections.frames.name);
  }

  private getFrameDocumentReference(id: string) {
    return this.getFrameCollectionReference().doc<FrameCollection>(id);
  }

  private getFrameImageDocumentReference(frameId: string, frameImageId: string = null) {
    return this.getFrameImageCollectionReference(frameId).doc<FrameImageSubCollection>(frameImageId);
  }

  private getFrameImageCollectionReference(frameId: string) {
    return this.getFrameDocumentReference(frameId).collection<FrameImageSubCollection>(environment.firebaseCollections.frames.images.name);
  }
}
