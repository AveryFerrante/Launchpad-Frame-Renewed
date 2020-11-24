import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[mainImageLazyLoad]'
})
export class ImageLazyLoadDirective implements OnInit {

  @Input('mainImageLazyLoad') source: string;
  private _intersectionObserver: IntersectionObserver;
  constructor(private image: ElementRef) { }

  ngOnInit(): void {
    this.registerIntersectionObserver();
  }


  private registerIntersectionObserver() {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '175px',
      threshold: 0.0
    };
    this._intersectionObserver = new IntersectionObserver(this.onIntersect, options);
    this._intersectionObserver.observe(this.image.nativeElement);
  }

  private onIntersect: IntersectionObserverCallback = ([entry], observer) => {
    if (entry.isIntersecting) {
      (entry.target as HTMLImageElement).src = this.source;
      observer.unobserve(this.image.nativeElement);
      observer.disconnect();
    }
  }

}
