import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from './actions';
import { initialState, State } from './state';

const r = createReducer(
  initialState,
  on(Actions.NewFrame.Request, (state: State) =>
    ({ ...state, isLoading: true, error: null })),
  on(Actions.NewFrame.RequestSuccess, (state: State, { successResponse }) =>
    ({ ...state, frame: successResponse, isLoading: false, error: null })),
  on(Actions.NewFrame.RequestFailure, (state: State, { failureResponse }) =>
    ({ ...state, frame: null, isLoading: false, error: failureResponse })),
);

export function reducer(state: State, action: Action) {
  return r(state, action);
}
