import { Action, createReducer, on, UPDATE } from '@ngrx/store';
import { FrameImageModel } from 'src/app/shared/models/view-models/frameModel';
import * as Actions from './actions';
import { initialState, FrameState } from './state';


function addImageToFrame(state: FrameState, successResponse: FrameImageModel): FrameState {
  const framesCopy = [...state.frames];
  const index = framesCopy.findIndex(f => f.id === state.selectedFrameId);
  const frameToAddImageTo = framesCopy.splice(index, 1).pop();
  const updatedFrame = { ...frameToAddImageTo, images: [...frameToAddImageTo.images, successResponse] };
  return { ...state, frames: [...framesCopy, updatedFrame], isLoading: false, error: null };
}

const turnOnLoading = (state: FrameState): FrameState => {
  return { ...state, isLoading: true, error: null };
};

const r = createReducer(
  initialState,
  on(Actions.NewFrame.Request, turnOnLoading),
  on(Actions.NewFrame.RequestSuccess, (state: FrameState, { successResponse }) =>
    ({ ...state, frames: [...state.frames, successResponse], selectedFrameId: successResponse.id, isLoading: false, error: null })),
  on(Actions.NewFrame.RequestFailure, (state: FrameState, { failureResponse }) =>
    ({ ...state, isLoading: false, error: failureResponse })),

  on(Actions.NewFrameImage.Request, turnOnLoading),
  on(Actions.NewFrameImage.RequestSuccess, (state: FrameState, { successResponse }) =>
    addImageToFrame(state, successResponse)),
  on(Actions.NewFrameImage.RequestFailure, (state: FrameState, { failureResponse }) =>
    ({ ...state, isLoading: false, error: failureResponse })),

  on(Actions.SelectFrame.RequestSuccess, (state: FrameState, { successResponse }) =>
    ({ ...state, selectedFrameId: successResponse })),

  on(Actions.LoadFrame.Request, turnOnLoading),
  on(Actions.LoadFrame.RequestSuccess, (state: FrameState, { successResponse }) =>
    ({ ...state, frames: [...state.frames, successResponse], selectedFrameId: successResponse.id, isLoading: false, error: null })),
  on(Actions.LoadFrame.RequestFailure, (state: FrameState, { failureResponse }) =>
    ({ ...state, isLoading: false, error: failureResponse }))
);

export function reducer(state: FrameState, action: Action) {
  return r(state, action);
}
