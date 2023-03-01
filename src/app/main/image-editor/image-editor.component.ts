import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { combineLatest, forkJoin, from, fromEvent, merge, Observable, of, pipe } from 'rxjs';
import { concatMap, delay, finalize, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ImageManipulatorService } from 'src/app/shared/services/image-manipulator/image-manipulator.service';
import { CanvasDrawingOrchestrator } from './services/canvas-drawing-orchestrator';

@Component({
  selector: 'main-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() imageData: File;
  @ViewChild('imageCanvas') imageCanvas: ElementRef<HTMLCanvasElement>;
  color: 'blue';
  private canvasDrawingOrchestrator: CanvasDrawingOrchestrator;
  constructor(private imageManipulatorService: ImageManipulatorService) { }

  ngAfterViewInit(): void {
    this.imageManipulatorService.getHTMLImageElementFromFile(this.imageData).pipe(
      tap((image: HTMLImageElement) => {
        this.canvasDrawingOrchestrator = new CanvasDrawingOrchestrator(this.imageCanvas.nativeElement, image);
      })
    ).subscribe();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.canvasDrawingOrchestrator.deactivate();
  }

  colorChange(event) {
    console.log(event);
    console.log(typeof(event));
  }

}


