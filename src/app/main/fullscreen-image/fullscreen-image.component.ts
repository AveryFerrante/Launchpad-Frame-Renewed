import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TransitionPresets } from './transition-presets';

@Component({
  selector: 'main-fullscreen-image',
  templateUrl: './fullscreen-image.component.html',
  styleUrls: ['./fullscreen-image.component.scss']
})
export class FullscreenImageComponent implements OnInit {
  transitionOptions = this.getRandomTransitionOptions();
  private imageSource: string;
  @Input() transitionsEnabled: boolean = true;
  @Input('imgSrc')
  set imgSrc(value: string) { this.imageSource = value; this.transitionOptions = this.getRandomTransitionOptions(); }
  get imgSrc() { return this.imageSource; }
  @ViewChild('imgElement') imgElement: ElementRef<HTMLImageElement>;
  @Output() onEscapeKeyPress = new EventEmitter<null>();
  @HostListener('document:keydown.escape', ['$event']) onEscapeHandler(event: KeyboardEvent) {
    this.onEscapeKeyPress.emit();
  }
  constructor() { }

  ngOnInit(): void {
  }

  private getRandomTransitionOptions() {
    return TransitionPresets[Math.floor(Math.random() * TransitionPresets.length)];
  }

}
