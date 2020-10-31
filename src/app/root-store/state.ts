import { User } from '../shared/models/firebase-collections/user';
import { FrameModel } from '../shared/models/view-models/frameModel';
import { UserFrame } from '../shared/models/view-models/NewUserRequest';


export const authenticationPropertyKey = 'authentication';
export interface State {
    [authenticationPropertyKey]: AuthenticationState;
}
export const initialState: AuthenticationState = {
  currentUser: null,
  isLoading: false,
  registerErrorMessage: null,
  loginErrorMessage: null
};

export interface AuthenticationState {
  currentUser: User;
  isLoading: boolean;
  registerErrorMessage: string;
  loginErrorMessage: string;
}
