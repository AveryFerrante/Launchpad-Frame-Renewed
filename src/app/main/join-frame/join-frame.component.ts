import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'main-join-frame',
  templateUrl: './join-frame.component.html',
  styleUrls: ['./join-frame.component.scss']
})
export class JoinFrameComponent implements OnInit {
  // TODO: USER CAN JOIN FRAME THEY ARE IN BY REPEATEDLY ENTERING ACCESS CODE. RESTRICT
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() joinFrame = new EventEmitter<string>();
  errorText = '';
  constructor() { }

  ngOnInit() {
  }

  onCloseModal() {
    this.closeModal.emit(true);
  }

  onCreateFrame(accessKey: string) {
    if (!accessKey || accessKey === '') {
      this.errorText = 'Must enter a value.';
    } else if (accessKey.length !== 6) {
      this.errorText = 'Value must have 6 characters/numbers.';
    } else {
      this.joinFrame.emit(accessKey);
    }
  }

}
