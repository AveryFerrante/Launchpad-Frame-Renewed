import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { FrameImageSubCollection } from 'src/app/shared/models/firebase-collections/frameCollection';

@Directive({
  selector: '[mainImageLazyLoad]'
})
export class ImageLazyLoadDirective implements OnInit {
  @Input('mainImageLazyLoad') imageData: FrameImageSubCollection;
  private _intersectionObserver: IntersectionObserver;
  get imgElement() { return this.imageElement.nativeElement as HTMLImageElement; }
  constructor(private imageElement: ElementRef) { }

  ngOnInit(): void {
    this.initializeImageDimensions();
    this.registerIntersectionObserver();
  }


  private initializeImageDimensions() {
    this.imgElement.width = this.imageData.dimensions.width;
    this.imgElement.height = this.imageData.dimensions.height;
  }

  private registerIntersectionObserver() {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '175px',
      threshold: 0.0
    };
    this._intersectionObserver = new IntersectionObserver(this.onIntersect, options);
    this._intersectionObserver.observe(this.imgElement);
  }

  private onIntersect: IntersectionObserverCallback = ([entry], observer) => {
    if (entry.isIntersecting) {
      (entry.target as HTMLImageElement).src = this.imageData.downloadUrl;
      observer.unobserve(this.imgElement);
      observer.disconnect();
    }
  }

}
