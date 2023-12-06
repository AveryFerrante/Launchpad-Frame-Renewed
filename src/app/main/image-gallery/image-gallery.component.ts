import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FrameImageModel } from 'src/app/shared/models/view-models/frameModel';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { fromEvent } from 'rxjs';
import { concatMap, map, mapTo, takeUntil, tap } from 'rxjs/operators';
import { FullscreenImageComponent } from '../fullscreen-image/fullscreen-image.component';

@Component({
  selector: 'main-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('imageContainer') imageContainer: ElementRef<HTMLDivElement>;
  @ViewChild(FullscreenImageComponent) image: FullscreenImageComponent;
  @Output() closeGallery = new EventEmitter<null>();
  @Input() images: FrameImageModel[];
  @Input() startId: string;
  currentImageSource: string;
  exitIcon = faBackspace;
  private touchStart: number;
  private currentImageIndex: number;
  constructor() { }

  ngOnInit(): void {
    this.currentImageIndex = this.images.findIndex(i => i.id === this.startId);
    this.currentImageSource = this.images[this.currentImageIndex].downloadUrl;
  }

  ngAfterViewInit(): void {
    const touchEnd$ = fromEvent(this.imageContainer.nativeElement, 'touchend');
    const touchMove$ = fromEvent(this.imageContainer.nativeElement, 'touchmove');
    fromEvent(this.imageContainer.nativeElement, 'touchstart').pipe(
      tap((touchStart: TouchEvent) => this.touchStart = touchStart.changedTouches[0].clientX),
      concatMap(() => touchMove$.pipe(takeUntil(touchEnd$.pipe(
        tap((touchEnd: TouchEvent) => {
          const moveDistance = this.touchStart - touchEnd.changedTouches[0].clientX;
          const direction = moveDistance > 0 ? 'left' : 'right';
          if (Math.abs(moveDistance) > 125) {
            if (direction === 'left') {
              this.currentImageIndex += 1;
              this.currentImageSource = this.images[this.currentImageIndex].downloadUrl;
            } else {
              this.currentImageIndex -= 1;
              this.currentImageSource = this.images[this.currentImageIndex].downloadUrl;
            }
          }
          this.image.imgElement.nativeElement.style.transform = `translateX(0px)`;
        })
      )))),
      tap((touchMove: TouchEvent) => {
        const moveDistance = this.touchStart - touchMove.changedTouches[0].clientX;
        console.log('moved distance:', moveDistance);
        this.image.imgElement.nativeElement.style.transform = `translateX(${moveDistance * -1}px)`;
      })
    ).subscribe();
  }

  onExit() {
    this.closeGallery.emit();
  }

}
