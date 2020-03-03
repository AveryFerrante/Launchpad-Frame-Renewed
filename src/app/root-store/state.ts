import { AuthenticationFeatureKey, AuthenticationState } from './authentication';

export interface State {
    [AuthenticationFeatureKey]: AuthenticationState;
}
