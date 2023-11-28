import { Directive, ElementRef, Input } from '@angular/core';
import { Observable, combineLatest, fromEvent, timer } from 'rxjs';
import { mapTo, take, tap } from 'rxjs/operators';

export interface TransitionOptions {
  classNamesToAdd: string[];
  classNamesToRemove: string[];
  animationDurationMs: number
}

@Directive({
  selector: '[mainImageTransition]'
})
export class ImageTransitionDirective {
  @Input('mainImageTransition')
  set imgSrc(value: string) { this.handleNewImageSource(value); }
  @Input('mainImageTransitionOptions') transitionOptions: TransitionOptions;
  private isFirstImage = true;
  constructor(private imageElement: ElementRef<HTMLImageElement>) { }

  private handleNewImageSource(source: string) {
    if (this.isFirstImage) {
      this.setImageElementSource(source);
      this.isFirstImage = false;
    }
    else {
      this.handleImageTransition(source);
    }
  }

  private handleImageTransition(source: string) {
    const currentTransitionOptions = this.transitionOptions;
    this.imageElement.nativeElement.classList.add(...currentTransitionOptions.classNamesToAdd);
    const newImageSource$ = this.preloadImageSource(source);
    const transitionComplete$ = this.waitTransitionDuration(currentTransitionOptions);
    combineLatest([newImageSource$, transitionComplete$]).pipe(take(1)).subscribe(([newImageSource]) => {
      this.setImageElementSource(newImageSource);
      this.imageElement.nativeElement.classList.remove(...currentTransitionOptions.classNamesToRemove);
    });
  }

  private setImageElementSource(source: string) {
    this.imageElement.nativeElement.src = source;
  }

  private preloadImageSource(imageSource: string): Observable<string> {
    const newImage = new Image();
    newImage.src = imageSource;
    return fromEvent(newImage, 'load').pipe(
      take(1),
      mapTo(newImage.src)
    );
  }

  private waitTransitionDuration(transitionOptions: TransitionOptions): Observable<number> {
    return timer(transitionOptions.animationDurationMs).pipe(
      take(1)
    );
  }
}
