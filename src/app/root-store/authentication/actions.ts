import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';

export const CreateEmailUserRequest = createAction('[Authentication] Create Email User Request', props<{ user: User }>());
export const CreateEmailUserRequestSuccess = createAction('[Authentication] Create Email User Request Success', props<{ user: User }>());
export const CreateEmailUserRequestFailure = createAction('[Authentication] Create Email User Request Failure', props<{ error: Error }>());