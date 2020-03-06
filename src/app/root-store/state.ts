import { User } from '../shared/models/user';


export const authenticationPropertyKey = 'authentication';
export interface State {
    [authenticationPropertyKey]: AuthenticationState;
}
export const initialState: AuthenticationState = {
  currentUser: null,
  isLoading: false,
  errorMessage: null
};

export interface AuthenticationState {
  currentUser: User;
  isLoading: boolean;
  errorMessage: string;
}
