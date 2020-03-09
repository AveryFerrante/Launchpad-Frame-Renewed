import { NewUserRequest } from './requests/NewUserRequest';

export interface User extends NewUserRequest {
    id: string;
}
