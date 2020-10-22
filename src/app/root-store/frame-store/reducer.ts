import { Action, createReducer, on } from '@ngrx/store';
import { initialState, State } from './state';

const r = createReducer(
  initialState
);

export function reducer(state: State, action: Action) {
  return r(state, action);
}
