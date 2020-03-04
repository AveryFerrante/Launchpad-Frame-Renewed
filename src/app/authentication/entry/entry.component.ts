import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState, RootActions } from '../../root-store';
import { NewUserRequest } from 'src/app/shared/models/requests/NewUserRequest';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

  onCreateAccount(request: NewUserRequest) {
    this.store$.dispatch(RootActions.CreateEmailUserRequest({ newUserRequest: request }));
  }

}
