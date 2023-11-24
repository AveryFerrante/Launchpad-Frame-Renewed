import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'main-fullscreen-image',
  templateUrl: './fullscreen-image.component.html',
  styleUrls: ['./fullscreen-image.component.scss']
})
export class FullscreenImageComponent implements OnInit {
  @Input() imgSrc: string;
  @Output() onEscapeKeyPress = new EventEmitter<null>();
  @HostListener('document:keydown.escape', ['$event']) onEscapeHandler(event: KeyboardEvent) {
    this.onEscapeKeyPress.emit();
  }
  constructor() { }

  ngOnInit(): void {
  }

}
