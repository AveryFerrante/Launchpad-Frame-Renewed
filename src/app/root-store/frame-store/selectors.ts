import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FrameState, frameStateKey } from './state';

export const SelectFrameState = createFeatureSelector<FrameState>(frameStateKey);

export const SelectFrameStoreIsLoading = createSelector(
  SelectFrameState,
  (s: FrameState) => s.isLoading
);

export const SelectSelectedFrame = createSelector(
  SelectFrameState,
  (s: FrameState) => s.frames.find(f => f.id === s.selectedFrameId)
);

export const SelectUploadPercentage = createSelector(
  SelectFrameState,
  (s: FrameState) => s.imageUploadPercentage
);

export const SelectSideNavVisibility = createSelector(
  SelectFrameState,
  (s: FrameState) => s.showSideNav
);