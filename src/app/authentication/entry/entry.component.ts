import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState, RootActions } from '../../root-store';
import { NewUserRequest } from 'src/app/shared/models/requests/NewUserRequest';

type ModeType = ('login' | 'register');

@Component({
  selector: 'authentication-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  mode: ModeType = 'login';
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

  onCreateAccount(request: NewUserRequest) {
    this.store$.dispatch(RootActions.CreateEmailUser.Request({ request }));
  }

  setMode(mode: ModeType) {
    this.mode = mode;
  }

}
