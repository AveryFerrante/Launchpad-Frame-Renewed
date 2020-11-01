import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Store } from '@ngrx/store';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { from, Observable, combineLatest } from 'rxjs';
import { finalize, last, mergeMap, tap } from 'rxjs/operators';
import { RootActions, RootSelectors, RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { FrameCollection, FrameImageSubCollection } from 'src/app/shared/models/firebase-collections/frameCollection';
import { FrameMetadataForUser, User } from 'src/app/shared/models/firebase-collections/user';
import { FrameTranslator } from 'src/app/shared/models/translators/frameTranslator';
import { FrameModel } from 'src/app/shared/models/view-models/frameModel';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  user$: Observable<User> = this.setUserListener();
  selectedFrame$: Observable<FrameModel> = this.setSelectedFrameListener();
  user: User;
  selectedFrame: FrameModel;
  constructor(private store$: Store<RootState>, private frameTranslator: FrameTranslator, private store: AngularFireStorage) { }

  ngOnInit() {
    this.user$.subscribe();
  }

  signout() {
    this.store$.dispatch(RootActions.SignOutUser());
  }

  onFrameSelect(frame: FrameMetadataForUser) {
    this.store$.dispatch(FrameStoreActions.SelectFrame.Request({ request: frame.frameId }));
  }

  onSelect(event: NgxDropzoneChangeEvent) {
    const percentage$: Observable<number>[] = [];
    event.addedFiles.forEach(f => {
      const path = this.user.id + '/' + new Date().toTimeString() + '-' + f.name;
      const ref = this.store.ref(path);
      const task = this.store.upload(path, f);
      task.snapshotChanges().pipe(
        finalize(async () => {
          const url = await ref.getDownloadURL().toPromise();
          this.createImage(url, path);
        })
      ).subscribe();
      percentage$.push(task.percentageChanges());
    });
    combineLatest(percentage$).pipe(
      tap((values: number[]) => {
        const sum = values.reduce((acc, current) => acc + current, 0);
        console.log(sum / values.length + ' percent of the way done');
      })
    ).subscribe();
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

  createImage(url: string, path: string) {
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
