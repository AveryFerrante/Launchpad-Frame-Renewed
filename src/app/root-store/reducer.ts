import { createReducer, on, Action } from '@ngrx/store';
import { State, initialState, AuthenticationState } from './state';
import * as Actions from './actions';

const r = createReducer(
    initialState,
    on(Actions.CreateEmailUserRequest, (state: AuthenticationState) =>
      ({ ...state, isLoading: true })),
    on(Actions.CreateEmailUserRequestSuccess, (state: AuthenticationState, { user }) =>
      ({ ...state, currentUser: user, isLoading: false, errorMessage: null })),
    on(Actions.CreateEmailUserRequestFailure, (state: AuthenticationState, { errorMessage }) =>
      ({ ...state, currentUser: null, isLoading: false, errorMessage }))
);

export function reducer(state: AuthenticationState, action: Action ) {
    return r(state, action);
}
