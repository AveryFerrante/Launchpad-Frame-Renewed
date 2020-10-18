import { User } from 'src/app/shared/models/firebase-collections/user';
import { NewUserRequest } from '../shared/models/requests/NewUserRequest';
import { SignInRequest } from '../shared/models/requests/signInRequest';
import { createDefaultRequestActions } from './actionFactory';

export const CreateEmailUser =
  createDefaultRequestActions<NewUserRequest, User, string>('[Authentication] Create Email User');
export const SignInWithEmail =
  createDefaultRequestActions<SignInRequest, User, string>('[Authentication] Sign In With Email');
export const GetUserAfterAuthentication =
  createDefaultRequestActions<firebase.User, User, string>('[Authentication] Get User After Authentication');

