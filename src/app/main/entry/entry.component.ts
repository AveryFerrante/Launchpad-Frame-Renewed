import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Store } from '@ngrx/store';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { from, Observable, combineLatest } from 'rxjs';
import { finalize, last, map, mergeMap, tap } from 'rxjs/operators';
import { RootActions, RootSelectors, RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { FrameCollection, FrameImageSubCollection } from 'src/app/shared/models/firebase-collections/frameCollection';
import { FrameMetadataForUser, User } from 'src/app/shared/models/firebase-collections/user';
import { FrameTranslator } from 'src/app/shared/models/translators/frameTranslator';
import { UploadImageResponse } from 'src/app/shared/models/uploadImageResponse';
import { FrameModel } from 'src/app/shared/models/view-models/frameModel';
import { FrameService } from 'src/app/shared/services/frame/frame.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  user$: Observable<User> = this.setUserListener();
  selectedFrame$: Observable<FrameModel> = this.setSelectedFrameListener();
  uploadPercentage$: Observable<number> = null;
  user: User;
  selectedFrame: FrameModel;
  constructor(private store$: Store<RootState>, private frameTranslator: FrameTranslator, private frameService: FrameService) { }

  ngOnInit() {
    this.user$.subscribe();
  }

  signout() {
    this.store$.dispatch(RootActions.SignOutUser());
  }

  onFrameSelect(frame: FrameMetadataForUser) {
    this.store$.dispatch(FrameStoreActions.SelectFrame.Request({ request: frame.frameId }));
  }

  createFrame() {
    const frame: FrameCollection = {
      name: 'New Frame!',
      creator: {
        userId: this.user.id,
        usesrname: this.user.username
      },
      participants: []
    };
    const frameRequest = this.frameTranslator.GetCreateFrameRequest(frame);
    this.store$.dispatch(FrameStoreActions.NewFrame.Request({ request: frameRequest }));
  }

  onFilesAdded(event: NgxDropzoneChangeEvent) {
    const percetageTrackers$: Observable<number>[] = [];
    event.addedFiles.forEach(file => {
      const path = this.getStoragePath(file);
      const uploadImageResponse = this.frameService.uploadImage(file, path);
      this.createImageOnCompletedUpload(uploadImageResponse, path);
      percetageTrackers$.push(uploadImageResponse.uploadTask.percentageChanges());
    });
    this.uploadPercentage$ = this.setUploadPercentage(percetageTrackers$);
  }

  private getStoragePath(file: File) {
    return this.user.id + '/' + new Date().toUTCString() + '-' + file.name;
  }

  private setUploadPercentage(percentage$: Observable<number>[]) {
    return combineLatest(percentage$).pipe(
      map((values: number[]) => {
        return values.reduce((acc, current) => acc + current, 0) / values.length;
      }),
      finalize(() => this.uploadPercentage$ = null)
    );
  }

  private createImageOnCompletedUpload(imageUpload: UploadImageResponse, path: string) {
    imageUpload.uploadTask.snapshotChanges().pipe(
      finalize(async () => {
        const url: string = await imageUpload.imageReference.getDownloadURL().toPromise();
        this.createImage(url, path);
      })
    ).subscribe();
  }

  private createImage(url: string, path: string) {
    const image: FrameImageSubCollection = {
      downloadUrl: url,
      userId: this.user.id,
      username: this.user.username,
      storagePath: path
    };
    const request = this.frameTranslator.GetCreateFrameImageRequest(this.selectedFrame.id, image);
    this.store$.dispatch(FrameStoreActions.NewFrameImage.Request({ request }));
  }

  private setUserListener() {
    return this.store$.select(RootSelectors.SelectAuthenticationUser).pipe(
      tap((user: User) => this.user = user)
    );
  }

  private setSelectedFrameListener() {
    return this.store$.select(FrameStoreSelectors.SelectSelectedFrame).pipe(
      tap((frame: FrameModel) => this.selectedFrame = frame)
    );
  }

}
