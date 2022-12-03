import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, Observable, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { GroupedImages } from 'src/app/shared/models/groupedImages';
import { FrameModel } from 'src/app/shared/models/view-models/frameModel';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'main-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {
  selectedFrame$: Observable<FrameModel> = this.store$.select(FrameStoreSelectors.SelectSelectedFrame);
  uploadPercentage$: Observable<number> = this.store$.select(FrameStoreSelectors.SelectUploadPercentage);
  groupedImages$ = this.setGroupedImagesSelector();
  showLiveView = false;
  faCamera = faCamera;

  fabOptionsAvailable = false;
  fabOptionsCork$ = new Subject<boolean>();
  @ViewChild('fabImageOptionsBackdrop') fabImageOptionsBackdrop: ElementRef<HTMLDivElement>;
  @ViewChild('fabImageOptionsUseCamera') fabImageOptionsUseCamera: ElementRef<HTMLSpanElement>;
  @ViewChild('fabImageOptionsUploadImage') fabImageOptionsUploadImage: ElementRef<HTMLSpanElement>;
  @ViewChild('imageFromCamera') imageFromCamera: ElementRef<HTMLInputElement>;
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

  onFilesAdded(files: File[]) {
    this.store$.dispatch(FrameStoreActions.UploadImagesRequest({ Images: files }));
  }

  onFilesAddedMobile(files: FileList) {
    this.onFilesAdded(Array.from(files));
  }

  onFabClick() {
    // this.fabOptionsAvailable = true;

    // fromEvent(this.fabImageOptionsUseCamera.nativeElement, 'click').pipe(
    //   tap(() => { this.imageFromCamera.nativeElement.click(); this.fabOptionsCork$.next(true); }),
    //   takeUntil(this.fabOptionsCork$)
    // ).subscribe();

    // fromEvent(this.fabImageOptionsUploadImage.nativeElement, 'click').pipe(
    //   tap(() => { this.fabOptionsCork$.next(true); }),
    //   takeUntil(this.fabOptionsCork$)
    // ).subscribe();

    // fromEvent(this.fabImageOptionsBackdrop.nativeElement, 'click').pipe(
    //   tap(() => { this.fabOptionsCork$.next(true); }),
    //   takeUntil(this.fabOptionsCork$)
    // ).subscribe({ complete: () => { this.fabOptionsAvailable = false; } });
    document.getElementById('mobileUpload').click();
  }

  onShowLiveView() {
    this.showLiveView = true;
  }

  onExitLiveView() {
    this.showLiveView = false;
  }

  private setGroupedImagesSelector() {
    return this.selectedFrame$.pipe(
      map((frame: FrameModel) => {
        const groupedImages: GroupedImages[] = [];

        const imgs = [...frame.images].map(image => {
          const newImg = { ...image };
          newImg.dimensions = newImg.dimensions !== undefined ? newImg.dimensions : { width: 500, height: 500 };
          return newImg;
        });

        imgs.forEach(image => {
          const existingIndex = groupedImages.findIndex(gi => gi.displayKey === image.username);
          if (existingIndex >= 0) {
            groupedImages[existingIndex].images.push(image);
          } else {
            groupedImages.push({ displayKey: image.username, images: [image] });
          }
        });
        return groupedImages;
      })
    )
  }
}
