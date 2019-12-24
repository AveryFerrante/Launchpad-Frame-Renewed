import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';
import { NewUserRequest } from 'src/app/shared/models/requests/NewUserRequest';

export const CreateEmailUserRequest = createAction('[Authentication] Create Email User Request', props<{ newUserRequest: NewUserRequest }>());
export const CreateEmailUserRequestSuccess = createAction('[Authentication] Create Email User Request Success', props<{ user: User }>());
export const CreateEmailUserRequestFailure = createAction('[Authentication] Create Email User Request Failure', props<{ error: Error }>());