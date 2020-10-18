import { createFeatureSelector, createSelector } from '@ngrx/store';
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

export const SelectAuthenticationErrorMessage = createSelector(
    SelectAuthenticationState,
    (s: AuthenticationState) => s.errorMessage
);
