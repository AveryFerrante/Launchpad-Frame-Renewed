import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store';
import { FrameStoreActions } from 'src/app/root-store/frame-store';
import { UserFrameMetadata } from 'src/app/shared/models/firebase-collections/user';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'main-frame-sidenav',
  templateUrl: './frame-sidenav.component.html',
  styleUrls: ['./frame-sidenav.component.scss']
})
export class FrameSidenavComponent implements OnInit {
  @Input() userFrames: UserFrameMetadata[];
  @Input() selectedFrameId: string;
  @Output() openCreateFrame = new EventEmitter<boolean>();
  @Output() openJoinFrame = new EventEmitter<boolean>();
  @Output() frameSelect = new EventEmitter<UserFrameMetadata>();
  faPlusSquare = faPlusSquare;
  faTimes = faTimes;
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

  onOpenCreateFrame() {
    this.openCreateFrame.emit(true);
  }

  onOpenJoinFrame() {
    this.openJoinFrame.emit(true);
  }

  onFrameSelect(frame: UserFrameMetadata) {
    this.frameSelect.emit(frame);
  }

  closeSidenav() {
    this.store$.dispatch(FrameStoreActions.UpdateSideNavVisibility({ visible: false }));
  }

}
