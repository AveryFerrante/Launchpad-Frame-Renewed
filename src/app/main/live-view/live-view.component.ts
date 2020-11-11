import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, interval, Observable, Subscription, timer, zip } from 'rxjs';
import { concatMap, map, repeat, scan, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { FrameImageModel } from 'src/app/shared/models/view-models/frameModel';

@Component({
  selector: 'main-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss']
})
export class LiveViewComponent implements OnInit, OnDestroy {
  currentImages$ = this.setCurrentImagesListener();
  currentImageIndex$ = this.setCurrentImageIndexGenerator();
  liveImage$ = this.setLiveImageGenerator();
  images: FrameImageModel[] = [];
  @Output() exit = new EventEmitter<boolean>();
  @HostListener('document:keydown.escape', ['$event']) onEscapeHandler(event: KeyboardEvent) {
    this.exit.emit(true);
  }
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
    this.store$.dispatch(FrameStoreActions.LiveImageListenerRequest());
  }

  ngOnDestroy() {
    this.store$.dispatch(FrameStoreActions.LiveImageListenerStopRequest());
  }

  private setCurrentImagesListener() {
    return this.store$.select(FrameStoreSelectors.SelectFrameImages).pipe(
      tap((images) => console.log('New payload from store: ', images)),
      scan((accumulated: FrameImageModel[], current: FrameImageModel[]) => {
        console.log('Current accumulated: ', accumulated);
        const difference = current.filter(c => !accumulated.includes(c));
        console.log('Detected difference of ', difference);
        return [...accumulated, ...difference];
      }, []),
      tap((images) => console.log('Outputting current images ', images))
    );
  }

  private setCurrentImageIndexGenerator() {
    return interval(7500).pipe(
      startWith(0),
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

}
