import { FrameModel } from 'src/app/shared/models/view-models/frameModel';

export const frameStateKey = 'frame';

export enum ModalTypes {
  JoinFrameModal,
  CreateFrameModal,
  None
}

export interface FrameState {
  frames: FrameModel[];
  selectedFrameId: string;
  isLoading: boolean;
  imageUploadPercentage: number;
  showSideNav: boolean;
  activeModal: ModalTypes;
  error: string;
}

export const initialState: FrameState = {
  frames: [],
  selectedFrameId: null,
  isLoading: false,
  imageUploadPercentage: null,
  showSideNav: false,
  activeModal: ModalTypes.None,
  error: null
};
