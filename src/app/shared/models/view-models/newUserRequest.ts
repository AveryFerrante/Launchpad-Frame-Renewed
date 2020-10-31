export interface NewUserRequest {
    email: string;
    password: string;
    username: string;
    imageUploadCount: number;
    frames: UserFrame[]
}

export interface UserFrame {
  id: string;
  permissions: string[];
}
