import { createAction } from '@ngrx/store';
import { User } from 'src/app/shared/models/firebase-collections/user';
import { NewUserRequest } from '../shared/models/view-models/NewUserRequest';
import { SignInRequest } from '../shared/models/view-models/signInRequest';
import { createDefaultRequestActions } from './shared/actionFactory';

export const CreateEmailUser =
  createDefaultRequestActions<NewUserRequest, User, string>('[Authentication] Create Email User');
export const SignInWithEmail =
  createDefaultRequestActions<SignInRequest, null, string>('[Authentication] Sign In With Email');
export const GetUserDataFromSignedInUser =
  createDefaultRequestActions<null, User, string>('[Authentication] Get User Data From Signed In User');

export const SignOutUserActionTitle = '[Authentication] Sign Out User';
export const SignOutUser = createAction(SignOutUserActionTitle);

