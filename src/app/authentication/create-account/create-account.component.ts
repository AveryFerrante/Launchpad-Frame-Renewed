import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { NewUserRequest } from 'src/app/shared/models/view-models/NewUserRequest';
import { UsernameService } from 'src/app/shared/services/username/username.service';
import { RootSelectors, RootState } from '../../root-store';

const USERNAME_MIN_LENGTH = 3;
const PASSWORD_MIN_LENGTH = 8;
const UNIQUE_USERNAME_ERROR = 'notUnique';

@Component({
  selector: 'authentication-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createAccountFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(USERNAME_MIN_LENGTH)],
      this.usernameIsUniqueValidator.bind(this)),
    password: new FormControl('', [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)])
  });
  get email(): FormControl { return this.createAccountFormGroup.controls.email as FormControl; }
  get username(): FormControl { return this.createAccountFormGroup.controls.username as FormControl; }
  get password(): FormControl { return this.createAccountFormGroup.controls.password as FormControl; }
  checkingUsernameLoading = false;
  passwordView: 'password' | 'text' = 'password';
  @Output() createAccount = new EventEmitter<NewUserRequest>();
  createAccountLoading$ = this.store$.pipe(select(RootSelectors.SelectAuthenticationIsLoading));
  createAccountError$ = this.store$.pipe(select(RootSelectors.SelectRegistrationErrorMessage));
  constructor(private store$: Store<RootState>, private usernameService: UsernameService) { }

  ngOnInit() { }

  onCreateAccount() {
    const request: NewUserRequest = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      imageUploadCount: 0,
      frames: []
    };
    this.createAccount.emit(request);
  }

  togglePasswordView() {
    this.passwordView = this.passwordView === 'text' ? 'password' : 'text';
  }

  getEmailError() {
    return this.email.hasError('required') ? 'Email is required' :
      this.email.hasError('email') ? 'Email is invalid' : '';
  }

  getPasswordError() {
    return this.password.hasError('required') ? 'Password is required' :
      this.password.hasError('minlength') ? `Password must be atleast ${PASSWORD_MIN_LENGTH} characters` : '';
  }

  getUsernameError() {
    return this.username.hasError('required') ? 'Username is required' :
      this.username.hasError('minlength') ? `Username must be atleast ${USERNAME_MIN_LENGTH} characters` :
      this.username.hasError(UNIQUE_USERNAME_ERROR) ? 'Username already exists, please choose another' : '';
  }

  private usernameIsUniqueValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    // The async validator automatically unsubscribes if the control recieves a new value before the observable emits
    return timer(500).pipe(
      tap(() => this.checkingUsernameLoading = true),
      switchMap(() => this.usernameService.usernameExists(control.value as string)),
      tap(() => this.checkingUsernameLoading = false),
      map(exists => exists ? { [UNIQUE_USERNAME_ERROR]: true } : null)
    );
  }
}
