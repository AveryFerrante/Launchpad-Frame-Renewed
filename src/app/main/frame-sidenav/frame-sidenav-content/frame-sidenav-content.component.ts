import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RootSelectors, RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { UserFrameMetadata } from 'src/app/shared/models/firebase-collections/user';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalTypes } from 'src/app/root-store/frame-store/state';
import { Router } from '@angular/router';
import { URL_PATHS } from 'src/app/shared/models/constants/urlPathConstants';

@Component({
  selector: 'main-frame-sidenav-content',
  templateUrl: './frame-sidenav-content.component.html',
  styleUrls: ['./frame-sidenav-content.component.scss']
})
export class FrameSidenavContentComponent implements OnInit {
  userFrames$ = this.setUserFramesListener();
  selectedFrameId$ = this.setSelectedFrameIdListener();
  icons = {
    close: faTimes,
    add: faPlusSquare
  }
  constructor(private store$: Store<RootState>, private router: Router) { }

  ngOnInit(): void {
  }

  onOpenCreateFrame() {
    this.store$.dispatch(FrameStoreActions.UpdateActiveModal({ activeModal: ModalTypes.CreateFrameModal }));
  }

  onOpenJoinFrame() {
    this.store$.dispatch(FrameStoreActions.UpdateActiveModal({ activeModal: ModalTypes.JoinFrameModal }));
  }

  closeSidenav() {
    this.store$.dispatch(FrameStoreActions.UpdateSideNavVisibility({ visible: false }));
  }

  onFrameSelect(frame: UserFrameMetadata) {
    this.router.navigateByUrl(`${URL_PATHS.home}/${frame.frameId}`);
    this.closeSidenav();
  }

  private setUserFramesListener(): Observable<UserFrameMetadata[]> {
    return this.store$.select(RootSelectors.SelectAuthenticationUser).pipe(
      map(user => user.frames)
    )
  }

  private setSelectedFrameIdListener() {
    return this.store$.select(FrameStoreSelectors.SelectSelectedFrame).pipe(
      map(frame => frame ? frame.id : '')
    );
  }

}
