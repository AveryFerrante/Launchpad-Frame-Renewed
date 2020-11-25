import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, concat, fromEvent, interval, Observable, Subject } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { GroupedImage, GroupedImages } from 'src/app/shared/models/groupedImages';
import { FrameModel } from 'src/app/shared/models/view-models/frameModel';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { IMAGE_VIEWPORT_BREAKPOINTS } from 'src/app/shared/models/constants/imageViewportBreakpoints';

@Component({
  selector: 'main-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit, AfterViewInit {
  selectedFrame$: Observable<FrameModel> = this.store$.select(FrameStoreSelectors.SelectSelectedFrame);
  uploadPercentage$: Observable<number> = this.store$.select(FrameStoreSelectors.SelectUploadPercentage);
  groupedImages$ = this.setGroupedImagesSelector();
  showLiveView = false;
  faCamera = faCamera;
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  onFilesAdded(files: File[]) {
    this.store$.dispatch(FrameStoreActions.UploadImagesRequest({ Images: files }));
  }

  onFilesAddedMobile(files: FileList) {
    this.onFilesAdded(Array.from(files));
  }

  onFabClick() {
    document.getElementById('mobileUpload').click();
  }

  onShowLiveView() {
    this.showLiveView = true;
  }

  onExitLiveView() {
    this.showLiveView = false;
  }

  private setGroupedImagesSelector() {
    const imageViewSize$ = this.getImageViewSizeWatcher();
    return combineLatest(this.selectedFrame$, imageViewSize$).pipe(
      map(([frame, width]: [FrameModel, number]) => {
        const groupedImages: GroupedImages[] = [];

        const imgs = [...frame.images].map((image) => {
          const newImg = { ...image };
          newImg.dimensions = newImg.dimensions !== undefined ? newImg.dimensions : { width: 500, height: 500 };
          return newImg;
        });

        imgs.forEach(image => {
          const existingIndex = groupedImages.findIndex(gi => gi.displayKey === image.username);
          if (existingIndex >= 0) {
            groupedImages[existingIndex].images.push({ image, displayDimensions: image.dimensions });
          } else {
            groupedImages.push({ displayKey: image.username, images: [{ image, displayDimensions: image.dimensions }] });
          }
        });
        return this.resolveBestDimensions(groupedImages, width);
      })
    );
  }

  private getImageViewSizeWatcher() {
    const initialImageViewSize$ = this.getInitialImageViewWatcher();
    const windowResize$ = this.getResizeListener();
    const imageViewSize$ = concat(initialImageViewSize$, windowResize$);
    return imageViewSize$;
  }

  private getInitialImageViewWatcher() {
    return interval(100).pipe(
      filter(() => document.querySelector('#test') !== null),
      take(1),
      map(this.getImageViewWidth)
    );
  }

  private getResizeListener() {
    return fromEvent(window, 'resize').pipe(
      map(this.getImageViewWidth)
    );
  }

  private resolveBestDimensions(groupedImages: GroupedImages[], width: number): GroupedImages[] {
    const flattened: GroupedImage[] = groupedImages.reduce((acc, curr) => [...acc, ...curr.images], []);
    const sort = flattened.sort((a, b) => a.image.dimensions.width - b.image.dimensions.width);
    const biggest = sort[sort.length - 1];
    const height = (width / this.resolveNumberOfImagesPerRow(width)) * (biggest.image.dimensions.height / biggest.image.dimensions.width);

    const groupedCopy = [...groupedImages];
    return groupedCopy.map(group => {
      const newGroup = { ...group };
      newGroup.images = newGroup.images.map(img => {
        const newImg: GroupedImage = { ...img, displayDimensions: { ...img.displayDimensions } };
        newImg.displayDimensions.height = height;
        newImg.displayDimensions.width = (height * (newImg.image.dimensions.width / newImg.image.dimensions.height));
        return newImg;
      });
      return newGroup;
    });
  }

  private resolveNumberOfImagesPerRow(width: number) {
    if (width <= IMAGE_VIEWPORT_BREAKPOINTS.small) {
      return 1;
    } else if (width <= IMAGE_VIEWPORT_BREAKPOINTS.medium) {
      return 2;
    } else {
      return 4;
    }
  }

  private getImageViewWidth() {
    const widthInPixelString = window.getComputedStyle(document.querySelector('#test')).width;
    const decimalRadix = 10;
    return parseInt(widthInPixelString.substr(0, widthInPixelString.length - 2), decimalRadix);
  }
}
