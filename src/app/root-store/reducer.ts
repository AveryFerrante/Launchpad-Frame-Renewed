import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { initialState, AuthenticationState } from './state';
import * as Actions from './actions';
import { CreateEmailUserAdjuster } from './state-adjusters/createEmailUserAdjuster';
import { NewFrameAdjuster } from './state-adjusters/newFrameAdjuster';
import { RootState } from '.';





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

    NewFrameAdjuster.SuccessHandler
);

export function reducer(state: AuthenticationState, action: Action ) {
    return reduce(state, action);
}

export function clearStateOnSignOut(r: ActionReducer<RootState>) {
  return (state: RootState, action: Action) => {
    if (action.type === Actions.SignOutUserActionTitle) {
      state = { } as RootState;
    }
    return r(state, action);
  };
}
