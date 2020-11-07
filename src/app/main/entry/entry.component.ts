import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RootSelectors, RootState } from 'src/app/root-store';
import { FrameStoreActions, FrameStoreSelectors } from 'src/app/root-store/frame-store';
import { FrameMetadataForUser, User } from 'src/app/shared/models/firebase-collections/user';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  showSidenav$ = this.store$.select(FrameStoreSelectors.SelectSideNavVisibility);
  user$: Observable<User> = this.store$.select(RootSelectors.SelectAuthenticationUser);
  selectedFrameId$ = this.setSelectedFrameIdListener();
  showCreateFrameModal = false;
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

  onFrameSelect(frame: FrameMetadataForUser) {
    this.store$.dispatch(FrameStoreActions.SelectFrame.Request({ request: frame.frameId }));
    this.closeSideNav();
  }

  openCreateFrame() {
    this.closeSideNav();
    this.showCreateFrameModal = true;
  }

  onCloseModal() {
    this.showCreateFrameModal = false;
  }

  onCreateFrame(frameName: string) {
    this.store$.dispatch(FrameStoreActions.NewFrame.Request({ request: frameName }));
    this.onCloseModal();
  }

  private closeSideNav() {
    this.store$.dispatch(FrameStoreActions.UpdateSideNavVisibility({ visible: false }));
  }

  private setSelectedFrameIdListener() {
    return this.store$.select(FrameStoreSelectors.SelectSelectedFrame).pipe(
      map(frame => {
        if (frame) {
          return frame.id;
        } else {
          return '';
        }
      })
    );
  }

}
