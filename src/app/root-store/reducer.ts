import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { initialState, AuthenticationState, State } from './state';
import * as Actions from './actions';
import { FrameStoreActions } from './frame-store';
import { UserFrameMetadata } from '../shared/models/firebase-collections/user';
import { FramePermissions } from '../shared/models/constants/framePermissions';
import { FrameModel } from '../shared/models/view-models/frameModel';



// TODO: SHOULD NOT DO DATA TRANSLATION HERE...EFFECT SHOULD DISPATCH MULTIPLE ACTIONS WITH CORRECT STATE DATA
function addFrameToUser(state: AuthenticationState, response: FrameModel): AuthenticationState {
  const newFrame: UserFrameMetadata = {
    frameId: response.id,
    permissions: [FramePermissions.creator],
    name: response.name
  };
  return { ...state, currentUser:
    { ...state.currentUser, frames: [...state.currentUser.frames, newFrame] }
  };
}

const reduce = createReducer(
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
    on(FrameStoreActions.NewFrame.RequestSuccess, (state: AuthenticationState, { successResponse }) => addFrameToUser(state, successResponse)),
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
