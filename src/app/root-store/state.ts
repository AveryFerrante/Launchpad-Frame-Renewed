import { User } from '../shared/models/user';


export const authenticationPropertyKey = 'authentication';
export interface State {
    [authenticationPropertyKey]: AuthenticationState;
}
export const initialState: State = {
  [authenticationPropertyKey]: {
    currentUser: null,
    isLoading: false,
    error: null
  }
};

export interface AuthenticationState {
  currentUser: User;
  isLoading: boolean;
  error: Error;
}
