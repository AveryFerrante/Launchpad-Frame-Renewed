import { FrameModel } from 'src/app/shared/models/view-models/frameModel';

export const stateKey = 'frame';

export interface State {
  frames: FrameModel[];
  selectedFrameId: string;
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  frames: [],
  selectedFrameId: null,
  isLoading: false,
  error: null
};
