import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/firebase-collections/user';
import { NewUserRequest } from '../shared/models/requests/NewUserRequest';

export const CreateEmailUserRequest =
  createAction('[Authentication] Create Email User Request', props<{ newUserRequest: NewUserRequest }>());
export const CreateEmailUserRequestSuccess =
  createAction('[Authentication] Create Email User Request Success', props<{ user: User }>());
export const CreateEmailUserRequestFailure =
  createAction('[Authentication] Create Email User Request Failure', props<{ errorMessage: string }>());
