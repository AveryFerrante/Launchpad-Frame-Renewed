export interface FrameCollection {
  name: string;
  creator: FrameUser;
  participants: FrameUser[];
  accessToken: FrameAccessToken;
}

export interface FrameUser {
  userId: string;
  usesrname: string;
}

export interface FrameAccessToken {
  token: string;
  expiresUtc: string;
}

// Sub collection of Frame
export interface FrameImageSubCollection {
  downloadUrl: string;
  userId: string;
  username: string;
  storagePath: string;
}


