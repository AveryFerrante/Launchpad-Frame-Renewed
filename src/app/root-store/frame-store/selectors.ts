import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, stateKey } from './state';

export const SelectFrameState = createFeatureSelector<State>(stateKey);

export const SelectFrameStoreIsLoading = createSelector(
  SelectFrameState,
  (s: State) => s.isLoading
);

export const SelectSelectedFrame = createSelector(
  SelectFrameState,
  (s: State) => s.frames.find(f => f.id === s.selectedFrameId)
);
