import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { GroupedImages } from 'src/app/shared/models/groupedImages';
import { FrameModel } from 'src/app/shared/models/view-models/frameModel';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
  icons = {
    close: faTimes
  }
  selectedImageSrc: string | null = null;
  showImageEditor = false;
  imageData: File;
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

  onFilesAdded(files: File[]) {
    this.store$.dispatch(FrameStoreActions.UploadImagesRequest({ Images: files }));
  }

  onFilesAddedMobile(files: FileList) {
    this.imageData = files[0];
    this.showImageEditor = true;
  }

  onShowLiveView() {
    this.showLiveView = true;
  }

  onExitLiveView() {
    this.showLiveView = false;
  }

  onSaveEditedImage(imageFile: File) {
    this.onImageEditorExit();
    this.onFilesAdded([imageFile]);
  }

  onImageEditorExit() {
    this.showImageEditor = false;
  }

  onSelectImage(imageSrc: string) {
    this.selectedImageSrc = imageSrc;
  }

  onCloseSelectedImage() {
    this.selectedImageSrc = null;
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
