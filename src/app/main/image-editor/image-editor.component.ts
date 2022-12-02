import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ImageManipulatorService } from 'src/app/shared/services/image-manipulator/image-manipulator.service';

@Component({
  selector: 'main-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit, AfterViewInit {

  @Input() imageData: File;
  @ViewChild('imageCanvas') imageCanvas: ElementRef<HTMLCanvasElement>;
  renderingContext: CanvasRenderingContext2D;
  constructor(private imageManipulatorService: ImageManipulatorService) { }

  ngAfterViewInit(): void {
    this.renderingContext = this.imageCanvas.nativeElement.getContext('2d');
    this.imageManipulatorService.getHTMLImageElementFromFile(this.imageData).pipe(
      tap((image: HTMLImageElement) => {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let aspectRatioOfImage = image.naturalWidth / image.naturalHeight;
        let imageDisplayWidth = image.naturalWidth;
        let imageDisplayHeight = image.naturalHeight;
        while (imageDisplayWidth > windowWidth || imageDisplayHeight > windowHeight) {
          if (aspectRatioOfImage > 1) {
            imageDisplayWidth = imageDisplayWidth / aspectRatioOfImage;
            imageDisplayHeight = imageDisplayHeight / aspectRatioOfImage;
          }
          else {
            imageDisplayWidth = imageDisplayWidth * aspectRatioOfImage;
            imageDisplayHeight = imageDisplayHeight * aspectRatioOfImage;
          }
        }
        this.imageCanvas.nativeElement.width = imageDisplayWidth;
        this.imageCanvas.nativeElement.height = imageDisplayHeight;
        this.renderingContext.drawImage(image, 0, 0, imageDisplayWidth, imageDisplayHeight);
      })
    ).subscribe();

    window.onresize = (event) => {
      this.imageManipulatorService.getHTMLImageElementFromFile(this.imageData).pipe(
        tap((image: HTMLImageElement) => {
          let windowWidth = event.target.innerWidth;
          let windowHeight = event.target.innerHeight;
          let aspectRatioOfImage = image.naturalWidth / image.naturalHeight;
          let imageDisplayWidth = image.naturalWidth;
          let imageDisplayHeight = image.naturalHeight;
          while (imageDisplayWidth > windowWidth || imageDisplayHeight > windowHeight) {
            if (aspectRatioOfImage > 1) {
              imageDisplayWidth = imageDisplayWidth / aspectRatioOfImage;
              imageDisplayHeight = imageDisplayHeight / aspectRatioOfImage;
            }
            else {
              imageDisplayWidth = imageDisplayWidth * aspectRatioOfImage;
              imageDisplayHeight = imageDisplayHeight * aspectRatioOfImage;
            }
          }
          this.imageCanvas.nativeElement.width = imageDisplayWidth;
          this.imageCanvas.nativeElement.height = imageDisplayHeight;
          this.renderingContext.drawImage(image, 0, 0, imageDisplayWidth, imageDisplayHeight);
        })
      ).subscribe();
    };
  }

  ngOnInit(): void {
  }

}
