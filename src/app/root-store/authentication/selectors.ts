import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, featureKey } from './state';

export const SelectAuthenticationState = createFeatureSelector<State>(featureKey);
export const SelectAuthenticationIsLoading = createSelector(
    SelectAuthenticationState,
    (s: State) => s.isLoading
);
export const SelectAuthenticationUser = createSelector(
    SelectAuthenticationState,
    (s: State) => s.currentUser
);
export const SelectAuthenticationError = createSelector(
    SelectAuthenticationState,
    (s: State) => s.error
);
