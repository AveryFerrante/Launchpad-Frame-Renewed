import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize, last, mergeMap, tap } from 'rxjs/operators';
import { RootActions, RootSelectors, RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { FrameCollection, FrameImageSubCollection } from 'src/app/shared/models/firebase-collections/frameCollection';
import { User } from 'src/app/shared/models/firebase-collections/user';
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
  imageSource$: Observable<string>;
  constructor(private store$: Store<RootState>, private frameTranslator: FrameTranslator, private store: AngularFireStorage) { }

  ngOnInit() {
    this.user$.subscribe();
    this.imageSource$ = this.store.ref(this.user.id + '/Sat Oct 31 2020').getDownloadURL();
  }

  signout() {
    this.store$.dispatch(RootActions.SignOutUser.Request({ request: null }));
  }

  fileChange(fileInput) {
    console.log(fileInput.target.files);
    const file: File = fileInput.target.files[0];
    const path = this.user.id + '/' + new Date().toTimeString() + '-' + file.name;
    const ref = this.store.ref(path);
    const task = this.store.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(async () => {
        const url = await ref.getDownloadURL().toPromise();
        this.createImage(url);
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

  createImage(url: string) {
    const image: FrameImageSubCollection = {
      downloadUrl: url,
      userId: this.user.id,
      username: this.user.username
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
