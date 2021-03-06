import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { initialState, AuthenticationState, State } from './state';
import * as Actions from './actions';
import { CreateEmailUserAdjuster } from './state-adjusters/createEmailUserAdjuster';
import { NewFrameAdjuster } from './state-adjusters/newFrameAdjuster';
import { FrameStoreActions } from './frame-store';





const reduce = createReducer(
    initialState,
    CreateEmailUserAdjuster.RequestHandler,
    CreateEmailUserAdjuster.SuccessHandler,
    CreateEmailUserAdjuster.FailureHandler,

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

    NewFrameAdjuster.SuccessHandler,

    on(FrameStoreActions.JoinFrame.RequestSuccess, (state: AuthenticationState, { successResponse }) =>
      ({ ...state, currentUser: { ...state.currentUser, frames: [...state.currentUser.frames, successResponse] }}))
);

export function reducer(state: AuthenticationState, action: Action ) {
    return reduce(state, action);
}

export function clearStateOnSignOut(r: ActionReducer<State>) {
  return (state: State, action: Action) => {
    if (action.type === Actions.SignOutUserActionTitle) {
      state = { } as State;
    }
    return r(state, action);
  };
}
