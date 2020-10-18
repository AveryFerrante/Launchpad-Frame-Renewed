import { createReducer, on, Action } from '@ngrx/store';
import { initialState, AuthenticationState } from './state';
import * as Actions from './actions';

const r = createReducer(
    initialState,
    on(Actions.CreateEmailUser.Request, (state: AuthenticationState) =>
      ({ ...state, isLoading: true })),
    on(Actions.CreateEmailUser.RequestSuccess, (state: AuthenticationState, { successResponse }) =>
      ({ ...state, currentUser: successResponse, isLoading: false, errorMessage: null })),
    on(Actions.CreateEmailUser.RequestFailure, (state: AuthenticationState, { failureResponse }) =>
      ({ ...state, currentUser: null, isLoading: false, errorMessage: failureResponse })),

    on(Actions.SignInWithEmail.Request, (state: AuthenticationState) =>
      ({ ...state, isLoading: true })),
    on(Actions.SignInWithEmail.RequestFailure, (state: AuthenticationState, { failureResponse }) =>
      ({ ...state, currentUser: null, isLoading: false, errorMessage: failureResponse })),

    on(Actions.GetUserAfterAuthentication.Request, (state: AuthenticationState) =>
      ({ ...state, isLoading: true })),
    on(Actions.GetUserAfterAuthentication.RequestSuccess, (state: AuthenticationState, { successResponse }) =>
      ({ ...state, currentUser: successResponse, isLoading: false, errorMessage: null })),
    on(Actions.GetUserAfterAuthentication.RequestFailure, (state: AuthenticationState, { failureResponse }) =>
      ({ ...state, currentUser: null, isLoading: false, errorMessage: failureResponse })),
);

export function reducer(state: AuthenticationState, action: Action ) {
    return r(state, action);
}
