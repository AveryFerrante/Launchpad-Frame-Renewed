import { Frame } from 'src/app/shared/models/firebase-collections/frame';

export const stateKey = 'frame';

export interface State {
  frame: Frame;
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  frame: null,
  isLoading: false,
  error: null
};
