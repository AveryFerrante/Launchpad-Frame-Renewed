import { createReducer, on, Action } from '@ngrx/store';
import { initialState, AuthenticationState } from './state';
import * as Actions from './actions';
import { FrameStoreActions } from './frame-store';

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
    on(Actions.SignInWithEmail.RequestSuccess, (state: AuthenticationState) =>
      ({ ...state, isLoading: false, loginErrorMessage: null })),
    on(Actions.SignInWithEmail.RequestFailure, (state: AuthenticationState, { failureResponse }) =>
      ({ ...state, currentUser: null, isLoading: false, loginErrorMessage: failureResponse })),

    on(Actions.GetUserDataFromSignedInUser.Request, (state: AuthenticationState) =>
      ({ ...state, isLoading: true })),
    on(Actions.GetUserDataFromSignedInUser.RequestSuccess, (state: AuthenticationState, { successResponse }) =>
      ({ ...state, currentUser: successResponse, isLoading: false, loginErrorMessage: null })),
    on(Actions.GetUserDataFromSignedInUser.RequestFailure, (state: AuthenticationState, { failureResponse }) =>
      ({ ...state, currentUser: null, isLoading: false, loginErrorMessage: failureResponse })),

    on(Actions.SignOutUser.RequestSuccess, (state: AuthenticationState) =>
      ({ ...state, currentUser: null, loginErrorMessage: null, registerErrorMessage: null, isLoading: false })),
    on(Actions.SignOutUser.RequestFailure, (state: AuthenticationState) =>
      ({ ...state, currentUser: null, isLoading: false, loginErrorMessage: null, registerErrorMessage: null })),

    on(FrameStoreActions.NewFrame.RequestSuccess, (state: AuthenticationState, { successResponse }) =>
      ({ ...state, currentUser:
        { ...state.currentUser, frames: [...state.currentUser.frames, { id: successResponse.id, frameId: 'REDO', permission: [1] }] }
      }))
);

export function reducer(state: AuthenticationState, action: Action ) {
    return r(state, action);
}
