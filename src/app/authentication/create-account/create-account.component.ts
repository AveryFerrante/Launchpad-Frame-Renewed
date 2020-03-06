import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { NewUserRequest } from 'src/app/shared/models/requests/NewUserRequest';
import { RootSelectors, RootState } from '../../root-store';

@Component({
  selector: 'authentication-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createAccountFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  get email(): FormControl { return this.createAccountFormGroup.controls.email as FormControl; }
  get username(): FormControl { return this.createAccountFormGroup.controls.username as FormControl; }
  get password(): FormControl { return this.createAccountFormGroup.controls.password as FormControl; }
  @Output() createAccount = new EventEmitter<NewUserRequest>();
  createAccountLoading$ = this.store$.pipe(select(RootSelectors.SelectAuthenticationIsLoading));
  createAccountError$ = this.store$.pipe(this.filterNullErrorMessages());
  constructor(public store$: Store<RootState>) { }

  ngOnInit() { }

  onCreateAccount() {
    const request: NewUserRequest = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value
    };
    this.createAccount.emit(request);
  }

  getEmailError() {
    return this.email.hasError('required') ? 'Email is required' :
      this.email.hasError('email') ? 'Email is invalid' : '';
  }

  getPasswordError() {
    return this.password.hasError('required') ? 'Password is required' :
      this.password.hasError('minlength') ? 'Password must be atleast 8 characters' : '';
  }

  private filterNullErrorMessages() {
    return pipe(
      select(RootSelectors.SelectAuthenticationErrorMessage),
      filter((e: string) => e !== null)
    );
  }
}
