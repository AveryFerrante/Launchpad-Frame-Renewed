import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { forkJoin, from, fromEvent, Observable } from 'rxjs';
import { map, mergeMap, skip, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SetBatchAction, UpdateBatchAction } from '../../models/batchAction';
import { FrameAccessToken, FrameCollection, FrameImageSubCollection, FrameUser } from '../../models/firebase-collections/frameCollection';
import { User } from '../../models/firebase-collections/user';
import { ImageDeminsions } from '../../models/imageDeminsions';
import { CreateFrameImageRequest, CreateFrameRequest } from '../../models/requests/frameRequests';
import { FrameTranslator } from '../../models/translators/frameTranslator';
import { UploadImageResponse } from '../../models/uploadImageResponse';
import { FrameModel } from '../../models/view-models/frameModel';
import * as firebase from 'firebase/app';

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

  uploadImages(images: File[], userId: string): Observable<UploadImageResponse[]> {
    const headers = environment.imageUploadProperties.cacheControlValues.reduce((acc, curr, index, arr) => {
      return acc + curr + (index === arr.length - 1 ? '' : ', ');
    }, '');
    const imageUploads = images.map(image => {
      return this.getImageDeminsions(image).pipe(
        map((deminsions: ImageDeminsions): UploadImageResponse => {
          const path = userId + '/' + new Date().toUTCString() + '-' + image.name;
          const ref = this.afStorage.ref(path);
          const task = this.afStorage.upload(path, image, { cacheControl: headers });
          return { imageReference: ref, uploadTask: task, storagePath: path, deminsions };
        })
      );
    });
    return forkJoin(imageUploads);
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

  getFrameDocumentSetBatchAction(request: CreateFrameRequest): SetBatchAction<FrameCollection> {
    return new SetBatchAction<FrameCollection>(
      this.getFrameDocumentReference(request.id).ref,
      request.data
    );
  }

  getFrameImageDocumentSetBatchAction(request: CreateFrameImageRequest): SetBatchAction<FrameImageSubCollection> {
    return new SetBatchAction<FrameImageSubCollection>(
      this.getFrameImageDocumentReference(request.frameId, request.id).ref,
      request.data
    );
  }

  addParticipantToFrameUpdateBatchAction(frameId: string, user: User): UpdateBatchAction<FrameCollection> {
    const frameParticipant: FrameUser = {
      userId: user.id,
      usesrname: user.username
    };
    return new UpdateBatchAction<FrameCollection>(
      this.getFrameDocumentReference(frameId).ref,
      { participants: firebase.default.firestore.FieldValue.arrayUnion(frameParticipant) }
    );
  }

  private getImageDeminsions(image: File): Observable<ImageDeminsions> {
    const fr = new FileReader();
    fr.readAsArrayBuffer(image);
    return fromEvent(fr, 'load').pipe(
      take(1),
      mergeMap(() => {
        const arrayBuffer: ArrayBuffer = fr.result as ArrayBuffer;
        const base64Data = this.toBase64(arrayBuffer);
        const imageObj = new Image(100, 100);
        imageObj.src = `data:${image.type};base64,${base64Data}`;
        return fromEvent(imageObj, 'load').pipe(
          take(1),
          map(() => {
            return { width: imageObj.naturalWidth, height: imageObj.naturalHeight };
          })
        );
      })
    );
  }

  private toBase64(arrayBuffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(arrayBuffer);
    bytes.forEach(b => binary += String.fromCharCode(b));
    return window.btoa(binary);
  }

  private getFrameAccessToken(): FrameAccessToken {
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 60);
    return {
      token: (Math.random() * 1e64).toString(36).substr(0, 6).toUpperCase(),
      expiresUtc: expiresDate.toUTCString()
    };
  }

  private getFrameCollectionReference(): AngularFirestoreCollection<FrameCollection> {
    return this.afStore.collection<FrameCollection>(environment.firebaseCollections.frames.name);
  }

  private getFrameDocumentReference(id: string) {
    return this.getFrameCollectionReference().doc(id);
  }

  private getFrameImageDocumentReference(frameId: string, frameImageId: string = null) {
    return this.getFrameImageCollectionReference(frameId).doc<FrameImageSubCollection>(frameImageId);
  }

  private getFrameImageCollectionReference(frameId: string) {
    const collectionName = environment.firebaseCollections.frames.images.name;
    return this.getFrameDocumentReference(frameId).collection<FrameImageSubCollection>(collectionName);
  }
}
