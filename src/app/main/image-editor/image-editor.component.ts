import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ImageManipulatorService } from 'src/app/shared/services/image-manipulator/image-manipulator.service';
import { CanvasDrawingOrchestrator } from './services/canvas-drawing-orchestrator';
import { LineStyle } from './services/line-draw-action';
import { faUndoAlt, faRedoAlt, faFileUpload, faPencilAlt, faTrash } from'@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store';
import { FrameStoreActions } from 'src/app/root-store/frame-store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'main-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() imageData: File;
  @ViewChild('imageCanvas') imageCanvas: ElementRef<HTMLCanvasElement>;
  colorPresets = ['#FFFFFF', '#808080', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#8B4513'];
  lineStyle: LineStyle = { color: this.colorPresets[2], size: environment.imageEditingProperties.initialBrushSize };
  icons = {
    undo: faUndoAlt,
    redo: faRedoAlt,
    save: faFileUpload,
    pencil: faPencilAlt,
    trash: faTrash
  };
  brushConfig = {
    maxSize: environment.imageEditingProperties.maxBrushSize,
    minSize: environment.imageEditingProperties.minBrushSize,
    step: environment.imageEditingProperties.brushSizeStep
  };
  private canvasDrawingOrchestrator: CanvasDrawingOrchestrator;
  constructor(private imageManipulatorService: ImageManipulatorService, private store$: Store<RootState>) { }

  ngAfterViewInit(): void {
    // TODO: Could I move this to ng-if on parent DIV element and use async pipe?
    this.imageManipulatorService.getHTMLImageElementFromFile(this.imageData).pipe(
      tap((image: HTMLImageElement) => {
        this.canvasDrawingOrchestrator = new CanvasDrawingOrchestrator(this.imageCanvas.nativeElement, image, this.lineStyle);
      })
    ).subscribe();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.canvasDrawingOrchestrator.deactivate();
  }

  colorChange(rgbColor: string) {
    this.lineStyle.color = rgbColor;
    this.canvasDrawingOrchestrator.setLineStyle(this.lineStyle);
  }

  brushSizeChange(size: number) {
    this.lineStyle.size = size;
    this.canvasDrawingOrchestrator.setLineStyle(this.lineStyle);
  }

  undoLastDrawAction() {
    this.canvasDrawingOrchestrator.undoLastDrawAction();
  }

  redoLastDrawAction() {
    this.canvasDrawingOrchestrator.redoLastDrawAction();
  }

  saveImage() {
    this.canvasDrawingOrchestrator.saveImage().pipe(
      tap((blob: File) => this.store$.dispatch(FrameStoreActions.UploadImagesRequest({ Images: [blob] })))
    ).subscribe();
  }

}


