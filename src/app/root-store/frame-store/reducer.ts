import { Action, createReducer, on, UPDATE } from '@ngrx/store';
import { FrameImageModel } from 'src/app/shared/models/view-models/frameModel';
import * as Actions from './actions';
import { initialState, State } from './state';


function addImageToFrame(state: State, successResponse: FrameImageModel): State {
  const framesCopy = [...state.frames];
  const index = framesCopy.findIndex(f => f.id === state.selectedFrameId);
  const frameToAddImageTo = framesCopy.splice(index, 1).pop();
  const updatedFrame = { ...frameToAddImageTo, images: [...frameToAddImageTo.images, successResponse] };
  return { ...state, frames: [...framesCopy, updatedFrame], isLoading: false, error: null };
}


const r = createReducer(
  initialState,
  on(Actions.NewFrame.Request, (state: State) =>
    ({ ...state, isLoading: true, error: null })),
  on(Actions.NewFrame.RequestSuccess, (state: State, { successResponse }) =>
    ({ ...state, frames: [...state.frames, successResponse], selectedFrameId: successResponse.id, isLoading: false, error: null })),
  on(Actions.NewFrame.RequestFailure, (state: State, { failureResponse }) =>
    ({ ...state, isLoading: false, error: failureResponse })),

  on(Actions.NewFrameImage.Request, (state: State) =>
    ({ ...state, isLoading: true, error: null })),
  on(Actions.NewFrameImage.RequestSuccess, (state: State, { successResponse }) =>
    addImageToFrame(state, successResponse)),
  on(Actions.NewFrameImage.RequestFailure, (state: State, { failureResponse }) =>
    ({ ...state, isLoading: false, error: failureResponse }))
);

export function reducer(state: State, action: Action) {
  return r(state, action);
}
