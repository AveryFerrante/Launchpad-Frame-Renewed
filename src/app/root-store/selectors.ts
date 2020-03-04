import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authenticationPropertyKey, AuthenticationState } from './state';

const SelectAuthenticationState = createFeatureSelector<AuthenticationState>(authenticationPropertyKey);
export const SelectAuthenticationIsLoading = createSelector(
    SelectAuthenticationState,
    (s: AuthenticationState) => s.isLoading
);
export const SelectAuthenticationUser = createSelector(
    SelectAuthenticationState,
    (s: AuthenticationState) => s.currentUser
);
export const SelectAuthenticationError = createSelector(
    SelectAuthenticationState,
    (s: AuthenticationState) => s.error
);
