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
  uploadPercentage$: Observable<number> = this.store$.select(FrameStoreSelectors.SelectUploadPercentage);
  showSidenav$ = this.store$.select(FrameStoreSelectors.SelectSideNavVisibility);
  user: User;
  selectedFrame: FrameModel;
  constructor(private store$: Store<RootState>, private frameTranslator: FrameTranslator, private frameService: FrameService) { }

  ngOnInit() {
    this.user$.subscribe();
  }

  onFrameSelect(frame: FrameMetadataForUser) {
    this.store$.dispatch(FrameStoreActions.SelectFrame.Request({ request: frame.frameId }));
    this.store$.dispatch(FrameStoreActions.UpdateSideNavVisibility({ visible: false }));
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
    this.store$.dispatch(FrameStoreActions.UploadImagesRequest({ Images: event.addedFiles }));
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
