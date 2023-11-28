import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'main-mobile-image-upload-fab',
  templateUrl: './mobile-image-upload-fab.component.html',
  styleUrls: ['./mobile-image-upload-fab.component.scss']
})
export class MobileImageUploadFabComponent implements OnInit {
  @ViewChild('fabImageUploadButton') fabImageUploadButton: ElementRef<HTMLInputElement>;
  @Output() filesAdded = new EventEmitter<FileList>();
  cameraIcon = faCamera;
  showSourceSelector = false;
  constructor() { }

  ngOnInit(): void {
  }

  onFilesAdded(files: FileList) {
    this.hideSourceSelection();
    this.filesAdded.emit(files);
  }

  onFabClick() {
    this.showSourceSelector = true;
  }

  selectSource(isCamera: boolean) {
    if (isCamera) this.fabImageUploadButton.nativeElement.setAttribute('capture', 'environment');
    else this.fabImageUploadButton.nativeElement.removeAttribute('capture');
    this.hideSourceSelection();
    this.initiateInputClick();
  }

  cancelSelection() {
    this.hideSourceSelection();
  }

  private initiateInputClick() {
    this.fabImageUploadButton.nativeElement.click();
  }

  private hideSourceSelection() {
    this.showSourceSelector = false;
  }

}
