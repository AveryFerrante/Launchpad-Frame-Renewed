import { on } from '@ngrx/store';
import { FramePermissions } from 'src/app/shared/models/constants/framePermissions';
import { FrameMetadataForUser } from 'src/app/shared/models/firebase-collections/user';
import { FrameModel } from 'src/app/shared/models/view-models/frameModel';
import { FrameStoreActions } from '../frame-store';
import { AuthenticationState } from '../state';

export const NewFrameAdjuster = {
  SuccessHandler: on(FrameStoreActions.NewFrame.RequestSuccess, (state: AuthenticationState, { successResponse }) =>
    addFrameToUser(state, successResponse))
};

function addFrameToUser(state: AuthenticationState, response: FrameModel): AuthenticationState {
  const newFrame: FrameMetadataForUser = {
    frameId: response.id,
    permissions: [FramePermissions.creator],
    name: response.name
  };
  return { ...state, currentUser:
    { ...state.currentUser, frames: [...state.currentUser.frames, newFrame] }
  };
}
