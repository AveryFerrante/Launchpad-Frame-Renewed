import { User } from '../shared/models/firebase-collections/user';


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
