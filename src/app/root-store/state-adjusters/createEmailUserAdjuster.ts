import { on } from '@ngrx/store';
import * as Actions from '../actions';
import { AuthenticationState } from '../state';

export const CreateEmailUserAdjuster = {
  RequestHandler: on(Actions.CreateEmailUser.Request, (state: AuthenticationState) =>
    ({ ...state, isLoading: true })),
  SuccessHandler: on(Actions.CreateEmailUser.RequestSuccess, (state: AuthenticationState, { successResponse }) =>
    ({ ...state, currentUser: successResponse, isLoading: false, registerErrorMessage: null })),
  FailureHandler: on(Actions.CreateEmailUser.RequestFailure, (state: AuthenticationState, { failureResponse }) =>
    ({ ...state, currentUser: null, isLoading: false, registerErrorMessage: failureResponse }))
};
