import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, interval } from 'rxjs';
import { map, scan, startWith, take, withLatestFrom } from 'rxjs/operators';
import { RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { FrameImageModel } from 'src/app/shared/models/view-models/frameModel';
import { AlertService } from 'src/app/shared/services/alert/alert.service';

@Component({
  selector: 'main-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss']
})
export class LiveViewComponent implements OnInit, OnDestroy, AfterViewInit {
  IMAGE_DISPLAY_DURATION = 7500;
  currentImages$ = this.setCurrentImagesListener();
  currentImageIndex$ = this.setCurrentImageIndexGenerator();
  liveImage$ = this.setLiveImageGenerator();
  images: FrameImageModel[] = [];
  @Input() accessCode: string;
  @Output() exit = new EventEmitter<null>();
  constructor(private store$: Store<RootState>, private alertService: AlertService) { }

  ngOnInit() {
    this.store$.dispatch(FrameStoreActions.LiveImageListenerRequest());
  }

  ngOnDestroy() {
    this.store$.dispatch(FrameStoreActions.LiveImageListenerStopRequest());
  }

  ngAfterViewInit() {
    const element = document.getElementById('mobile-exit-overlay');
    const display = getComputedStyle(element).display;
    if (display !== 'none') {
      this.initializeMobileView(element);
    } else {
      this.alertService.alert({ message: 'Press escape to exit', type: 'inform' });
    }
  }

  closeLiveView() {
    this.exit.emit();
  }

  private setCurrentImagesListener() {
    return this.store$.select(FrameStoreSelectors.SelectFrameImages).pipe(
      scan((accumulated: FrameImageModel[], current: FrameImageModel[]) => {
        const difference = current.filter(c => !accumulated.includes(c));
        return [...accumulated, ...difference];
      }, [])
    );
  }

  private setCurrentImageIndexGenerator() {
    return interval(this.IMAGE_DISPLAY_DURATION).pipe(
      startWith(0), // Else we have to wait duration before first image appears
      withLatestFrom(this.currentImages$),
      map(([_, images]) => images),
      scan((accumulatedIndex: number, currentImagesArray: FrameImageModel[]) => (accumulatedIndex + 1) % currentImagesArray.length, 0)
    );
  }

  private setLiveImageGenerator() {
    return this.currentImageIndex$.pipe(
      withLatestFrom(this.currentImages$),
      map(([currentIndex, currentImages]) => currentImages[currentIndex])
    );
  }

  private initializeMobileView(clickElement: HTMLElement) {
    this.alertService.alert({ message: 'Tap anywhere on the screen to exit', type: 'inform' });
    fromEvent(clickElement, 'click').pipe(
      take(1)
    ).subscribe(() => this.closeLiveView());
  }
}
