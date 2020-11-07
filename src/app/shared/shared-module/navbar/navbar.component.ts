import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootActions, RootState } from 'src/app/root-store';
import { FrameStoreActions } from 'src/app/root-store/frame-store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

  onLogout() {
    this.store$.dispatch(RootActions.SignOutUser());
  }

  openSideNav() {
    this.store$.dispatch(FrameStoreActions.UpdateSideNavVisibility({ visible: true }));
  }

}
