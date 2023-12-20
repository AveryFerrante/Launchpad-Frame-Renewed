import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { UserFrameMetadata } from 'src/app/shared/models/firebase-collections/user';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'main-frame-sidenav',
  templateUrl: './frame-sidenav.component.html',
  styleUrls: ['./frame-sidenav.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.2s ease-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.2s ease-out', style({ transform: 'translateX(-100%)' }))
      ]),
    ])
  ]
})
export class FrameSidenavComponent implements OnInit {
  @Input() userFrames: UserFrameMetadata[];
  @Input() selectedFrameId: string;
  @Output() openCreateFrame = new EventEmitter<boolean>();
  @Output() openJoinFrame = new EventEmitter<boolean>();
  @Output() frameSelect = new EventEmitter<UserFrameMetadata>();
  showSidenav$ = this.store$.select(FrameStoreSelectors.SelectSideNavVisibility);
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
