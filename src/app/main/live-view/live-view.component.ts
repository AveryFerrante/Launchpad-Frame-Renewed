import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, interval, Observable, Subscription, timer, zip } from 'rxjs';
import { concatMap, map, repeat, tap } from 'rxjs/operators';
import { RootState } from 'src/app/root-store';
import { FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { FrameImageModel } from 'src/app/shared/models/view-models/frameModel';

@Component({
  selector: 'main-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss']
})
export class LiveViewComponent implements OnInit, OnDestroy {
  frameImages$ = this.setFrameImageListener();
  frameImagesSubscription: Subscription;
  rotatingImages$: Observable<FrameImageModel>;
  images: FrameImageModel[] = [];
  @Output() exit = new EventEmitter<boolean>();
  @HostListener('document:keydown.escape', ['$event']) onEscapeHandler(event: KeyboardEvent) {
    this.exit.emit(true);
  }
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
    this.frameImagesSubscription = this.frameImages$.subscribe();
    this.rotatingImages$ = this.setRotatingImageListener();
  }

  ngOnDestroy() {
    this.frameImagesSubscription.unsubscribe();
  }

  private setFrameImageListener() {
    return this.store$.select(FrameStoreSelectors.SelectFrameImages).pipe(
      tap((frameImages) => this.images = [...frameImages])
    );
  }

  private setRotatingImageListener() {
    return zip(interval(500), from(this.images)).pipe(
      map(([_, frameImage]) => frameImage),
      repeat()
    );
  }

}
