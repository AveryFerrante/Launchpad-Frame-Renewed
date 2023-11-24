import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authenticationPropertyKey, AuthenticationState, RootState } from './state';

export const SelectAuthenticationState = createFeatureSelector<RootState, AuthenticationState>(authenticationPropertyKey);

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
