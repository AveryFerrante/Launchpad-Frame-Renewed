import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NewUserRequest } from 'src/app/shared/models/requests/NewUserRequest';
import { Store, select } from '@ngrx/store';
import { RootState, RootSelectors } from '../../root-store';
import { map, filter } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'authentication-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createAccountFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required])
  }, { validators: [this.passwordMatchValidator('password', 'passwordConfirm')] });
  get firstName(): FormControl { return this.createAccountFormGroup.controls.firstName as FormControl; }
  get lastName(): FormControl { return this.createAccountFormGroup.controls.lastName as FormControl; }
  get email(): FormControl { return this.createAccountFormGroup.controls.email as FormControl; }
  get username(): FormControl { return this.createAccountFormGroup.controls.username as FormControl; }
  get password(): FormControl { return this.createAccountFormGroup.controls.password as FormControl; }
  get passwordConfirm(): FormControl { return this.createAccountFormGroup.controls.passwordConfirm as FormControl; }
  @Output() createAccount = new EventEmitter<NewUserRequest>();
  createAccountLoading$ = this.store$.pipe(select(RootSelectors.SelectAuthenticationIsLoading));
  createAccountError$ = this.store$.pipe(this.getCreateAccountErrorMessage());
  constructor(public store$: Store<RootState>) { }

  ngOnInit() { }

  getFirstNameError() {
    return this.firstName.hasError('required') ? 'First Name is required' : '';
  }

  getLastNameError() {
    return this.lastName.hasError('required') ? 'Last Name is required' : '';
  }

  getEmailError() {
    return this.email.hasError('required') ? 'Email is required' :
      this.email.hasError('email') ? 'Email is invalid' : '';
  }

  getPasswordError() {
    return this.password.hasError('required') ? 'Password is required' :
      this.password.hasError('minlength') ? 'Password must be atleast 8 characters' : '';
  }

  getPasswordConfirmError() {
    return this.passwordConfirm.hasError('passwordMismatch') ? 'Passwords must match' : '';
  }

  onCreateAccount() {
    const request: NewUserRequest = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      username: this.username.value,
      email: this.email.value,
      password: this.password.value
    };
    this.createAccount.emit(request);
  }

  private passwordMatchValidator(primaryPasswordControlName: string, confirmPasswordControlName: string): ValidatorFn {
    return (group: FormGroup) => {
      const password = group.controls[primaryPasswordControlName];
      const confirmPassword = group.controls[confirmPasswordControlName];
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      }
      return null;
    };
  }

  private getCreateAccountErrorMessage() {
    return pipe(
      select(RootSelectors.SelectAuthenticationError),
      filter((e: Error) => e !== null),
      map((e: Error) => `ERROR: ${e.message}`)
    );
  }
}
