import { createReducer, on, Action } from '@ngrx/store';
import { State, initialState } from './state';
import * as Actions from './actions';

const r = createReducer(
    initialState,
    on(Actions.CreateEmailUserRequest, (state: State) => ({ ...state, isLoading: true })),
    on(Actions.CreateEmailUserRequestSuccess, (state: State, { user }) => ({ ...state, currentUser: user, isLoading: false })),
    on(Actions.CreateEmailUserRequestFailure, (state: State, { error }) => ({ ...state, currentUser: null, isLoading: false, error }))
);

export function reducer(state: State, action: Action ) {
    return r(state, action);
}
