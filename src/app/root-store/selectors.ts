import { createFeatureSelector, createSelector } from '@ngrx/store';
import { min } from 'rxjs/operators';
import { authenticationPropertyKey, State, AuthenticationState } from './state';

export const SelectAuthenticationState = createFeatureSelector<AuthenticationState>(authenticationPropertyKey);

export const SelectAuthenticationIsLoading = createSelector(
    SelectAuthenticationState,
    (s: AuthenticationState) => s.isLoading
);

export const SelectAuthenticationUser = createSelector(
    SelectAuthenticationState,
    (s: AuthenticationState) => s.currentUser
);

export const SelectRegistrationErrorMessage = createSelector(
    SelectAuthenticationState,
    (s: AuthenticationState) => s.registerErrorMessage === null ? '' : s.registerErrorMessage
);

export const SelectLoginErrorMessage = createSelector(
  SelectAuthenticationState,
  (s: AuthenticationState) => s.loginErrorMessage === null ? '' : s.loginErrorMessage
);
