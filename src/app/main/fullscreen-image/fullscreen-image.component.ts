import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TransitionPresets } from './transition-presets';

@Component({
  selector: 'main-fullscreen-image',
  templateUrl: './fullscreen-image.component.html',
  styleUrls: ['./fullscreen-image.component.scss']
})
export class FullscreenImageComponent implements OnInit {
  transitionOptions = TransitionPresets[5];// this.setRandomTransitionOptions();
  private imageSource: string;
  @Input('imgSrc')
  set imgSrc(value: string) { this.imageSource = value; this.transitionOptions = this.setRandomTransitionOptions(); }
  get imgSrc() { return this.imageSource; }
  @ViewChild('imgElement') imgElement: ElementRef<HTMLImageElement>;
  @Output() onEscapeKeyPress = new EventEmitter<null>();
  @HostListener('document:keydown.escape', ['$event']) onEscapeHandler(event: KeyboardEvent) {
    this.onEscapeKeyPress.emit();
  }
  constructor() { }

  ngOnInit(): void {
  }

  private setRandomTransitionOptions() {
    return TransitionPresets[Math.floor(Math.random() * TransitionPresets.length)];
  }

}
