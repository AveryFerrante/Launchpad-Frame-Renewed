import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { mapTo, mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageManipulatorService {

  constructor() { }

  getHTMLImageElementFromFile(file: File): Observable<HTMLImageElement> {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    return fromEvent(fr, 'load').pipe(
      take(1),
      mergeMap(() => {
        const dataUrl: string = fr.result as string;
        const imageObj = new Image(100, 100);
        imageObj.src = dataUrl;
        return fromEvent(imageObj, 'load').pipe(
          take(1),
          mapTo(imageObj)
        );
      })
    );
  }
}
