import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { ImageManipulatorService } from 'src/app/shared/services/image-manipulator/image-manipulator.service';
import { CanvasDrawingOrchestrator } from './services/canvas-drawing-orchestrator';
import { LineStyle } from './services/line-draw-action';
import { faUndoAlt, faRedoAlt, faCheck, faPencilAlt, faTrash } from'@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'main-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() imageData: File;
  @Output() exit: EventEmitter<null> = new EventEmitter();
  @Output() save: EventEmitter<File> = new EventEmitter();
  @ViewChild('imageCanvas') imageCanvas: ElementRef<HTMLCanvasElement>;
  showDeleteConfirmation = false;
  colorPresets = ['#FFFFFF', '#808080', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#8B4513'];
  lineStyle: LineStyle = { color: this.colorPresets[2], size: environment.imageEditingProperties.initialBrushSize };
  icons = {
    undo: faUndoAlt,
    redo: faRedoAlt,
    save: faCheck,
    pencil: faPencilAlt,
    trash: faTrash
  };
  brushConfig = {
    maxSize: environment.imageEditingProperties.maxBrushSize,
    minSize: environment.imageEditingProperties.minBrushSize,
    step: environment.imageEditingProperties.brushSizeStep
  };
  private canvasDrawingOrchestrator: CanvasDrawingOrchestrator;
  constructor(private imageManipulatorService: ImageManipulatorService) { }

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
      tap((blob: File) => this.save.emit(blob)),
      take(1)
    ).subscribe();
  }

  closeImageEditor() {
    this.showDeleteConfirmation = true;
  }

  closeDeleteConfirmation() {
    this.showDeleteConfirmation = false;
  }

  confirmDeleteImage() {
    this.exit.emit();
  }

}


