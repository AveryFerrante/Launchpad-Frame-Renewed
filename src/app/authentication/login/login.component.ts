import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { RootSelectors, RootState } from 'src/app/root-store';
import { SignInRequest } from 'src/app/shared/models/view-models/signInRequest';

@Component({
  selector: 'authentication-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() login = new EventEmitter<SignInRequest>();
  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  get email(): FormControl { return this.loginFormGroup.controls.email as FormControl; }
  get password(): FormControl { return this.loginFormGroup.controls.password as FormControl; }
  passwordView: 'password' | 'text' = 'password';
  loginError$ = this.store$.pipe(select(RootSelectors.SelectLoginErrorMessage));
  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
  }

  onLogin() {
    const signInRequest: SignInRequest = {
      email: this.email.value,
      password: this.password.value
    };
    this.login.emit(signInRequest);
  }

  togglePasswordView() {
    this.passwordView = this.passwordView === 'text' ? 'password' : 'text';
  }

  getEmailError() {
    return this.email.hasError('required') ? 'Email is required' :
      this.email.hasError('email') ? 'Email is invalid' : '';
  }

  getPasswordError() {
    return this.password.hasError('required') ? 'Password is required' : '';
  }

}
