import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store';


@Component({
  selector: 'main-create-frame',
  templateUrl: './create-frame.component.html',
  styleUrls: ['./create-frame.component.scss']
})
export class CreateFrameComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() createFrame = new EventEmitter<string>();
  errorText = '';
  constructor() { }

  ngOnInit() {
  }

  onCloseModal() {
    this.closeModal.emit(true);
  }

  onCreateFrame(frameName: string) {
    if (!frameName || frameName === '') {
      this.errorText = 'Must enter a name.';
    } else {
      this.createFrame.emit(frameName);
    }
  }

}
