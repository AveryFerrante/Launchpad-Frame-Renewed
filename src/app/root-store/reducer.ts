import { createReducer, on, Action } from '@ngrx/store';
import { initialState, AuthenticationState } from './state';
import * as Actions from './actions';

const r = createReducer(
    initialState,
    on(Actions.CreateEmailUser.Request, (state: AuthenticationState) =>
      ({ ...state, isLoading: true })),
    on(Actions.CreateEmailUser.RequestSuccess, (state: AuthenticationState, { successResponse }) =>
      ({ ...state, currentUser: successResponse, isLoading: false, registerErrorMessage: null })),
    on(Actions.CreateEmailUser.RequestFailure, (state: AuthenticationState, { failureResponse }) =>
      ({ ...state, currentUser: null, isLoading: false, registerErrorMessage: failureResponse })),

    on(Actions.SignInWithEmail.Request, (state: AuthenticationState) =>
      ({ ...state, isLoading: true })),
    on(Actions.SignInWithEmail.RequestSuccess, (state: AuthenticationState, { successResponse }) =>
      ({ ...state, isLoading: false, loginErrorMessage: null, currentUser: successResponse })),
    on(Actions.SignInWithEmail.RequestFailure, (state: AuthenticationState, { failureResponse }) =>
      ({ ...state, currentUser: null, isLoading: false, loginErrorMessage: failureResponse })),

    on(Actions.GetUserAfterAuthentication.Request, (state: AuthenticationState) =>
      ({ ...state, isLoading: true })),
    on(Actions.GetUserAfterAuthentication.RequestSuccess, (state: AuthenticationState, { successResponse }) =>
      ({ ...state, currentUser: successResponse, isLoading: false, loginErrorMessage: null })),
    on(Actions.GetUserAfterAuthentication.RequestFailure, (state: AuthenticationState, { failureResponse }) =>
      ({ ...state, currentUser: null, isLoading: false, loginErrorMessage: failureResponse })),
);

export function reducer(state: AuthenticationState, action: Action ) {
    return r(state, action);
}
