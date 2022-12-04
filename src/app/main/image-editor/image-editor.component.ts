import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Type, ViewChild } from '@angular/core';
import { combineLatest, forkJoin, from, fromEvent, merge, Observable, of, pipe } from 'rxjs';
import { concatMap, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { ImageManipulatorService } from 'src/app/shared/services/image-manipulator/image-manipulator.service';
import { CanvasDrawingOrchestrator } from './canvas-drawing-orchestrator';

@Component({
  selector: 'main-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit, AfterViewInit {

  @Input() imageData: File;
  @ViewChild('imageCanvas') imageCanvas: ElementRef<HTMLCanvasElement>;
  canvasDrawingOrchestrator: CanvasDrawingOrchestrator;
  constructor(private imageManipulatorService: ImageManipulatorService) { }

  ngAfterViewInit(): void {
    this.imageManipulatorService.getHTMLImageElementFromFile(this.imageData).pipe(
      tap((image: HTMLImageElement) => {
        this.displayImageOnCanvas(image, window);
        this.canvasDrawingOrchestrator = new CanvasDrawingOrchestrator(this.imageCanvas.nativeElement);
        this.canvasDrawingOrchestrator.enableImageDrawing();
      })
    ).subscribe();

    window.onresize = (event: UIEvent) => {
      this.imageManipulatorService.getHTMLImageElementFromFile(this.imageData).pipe(
        tap((image: HTMLImageElement) => {
          let oldCanvasWidth = this.imageCanvas.nativeElement.width;
          let oldCanvasHeight = this.imageCanvas.nativeElement.height;
          this.displayImageOnCanvas(image, event.target as Window);
          this.canvasDrawingOrchestrator.redrawLines(oldCanvasWidth, oldCanvasHeight);
        })
      ).subscribe();
    };
  }

  private displayImageOnCanvas(image: HTMLImageElement, window: Window) {
    let isVerticalDisplay = window.innerWidth < window.innerHeight;

    if (isVerticalDisplay) {
      this.imageCanvas.nativeElement.width = window.innerWidth;
      this.imageCanvas.nativeElement.height = window.innerHeight;
    }
    else {
      this.imageCanvas.nativeElement.width = window.innerWidth;
      this.imageCanvas.nativeElement.height = window.innerHeight;
    }
    let hRatio = this.imageCanvas.nativeElement.width / image.naturalWidth;
    let vRatior = this.imageCanvas.nativeElement.height / image.naturalHeight;
    let ratio = Math.min(hRatio, vRatior);
    this.imageCanvas.nativeElement.width = image.naturalWidth * ratio;
    this.imageCanvas.nativeElement.height = image.naturalHeight * ratio;
    let renderingContext = this.imageCanvas.nativeElement.getContext('2d');
    renderingContext.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth * ratio, image.naturalHeight * ratio);
  }

  ngOnInit(): void {
  }

}


