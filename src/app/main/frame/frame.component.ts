import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { FrameModel } from 'src/app/shared/models/view-models/frameModel';

@Component({
  selector: 'main-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {
  selectedFrame$: Observable<FrameModel> = this.store$.select(FrameStoreSelectors.SelectSelectedFrame);
  uploadPercentage$: Observable<number> = this.store$.select(FrameStoreSelectors.SelectUploadPercentage);
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

  onFilesAdded(event: NgxDropzoneChangeEvent) {
    this.store$.dispatch(FrameStoreActions.UploadImagesRequest({ Images: event.addedFiles }));
  }

}
