import { User } from 'src/app/shared/models/firebase-collections/user';
import { NewUserRequest } from '../shared/models/requests/NewUserRequest';
import { SignInRequest } from '../shared/models/requests/signInRequest';
import { createDefaultRequestActions } from './shared/actionFactory';

export const CreateEmailUser =
  createDefaultRequestActions<NewUserRequest, User, string>('[Authentication] Create Email User');
export const SignInWithEmail =
  createDefaultRequestActions<SignInRequest, null, string>('[Authentication] Sign In With Email');
export const GetUserDataFromSignedInUser =
  createDefaultRequestActions<null, User, string>('[Authentication] Get User Data From Signed In User');
export const SignOutUser =
  createDefaultRequestActions<null, null, null>('[Authentication] Sign Out User');

