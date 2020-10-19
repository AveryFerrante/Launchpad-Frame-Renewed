import { Component, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RootActions, RootState } from 'src/app/root-store';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  constructor(private store$: Store<RootState>) { }

  ngOnInit() {

  }

  signout() {
    this.store$.dispatch(RootActions.SignOutUser.Request({ request: null }));
  }

}
