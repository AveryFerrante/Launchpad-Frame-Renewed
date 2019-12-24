import { User } from 'src/app/shared/models/User';

export interface State {
    currentUser: User,
    isLoading: boolean,
    error: Error
}

export const initialState: State = {
    currentUser: null,
    isLoading: false,
    error: null
};

export const featureKey = 'authentication';