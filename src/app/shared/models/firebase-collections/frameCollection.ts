export interface FrameCollection {
  name: string;
  creator: FrameUser;
  participants: FrameUser[];
}

export interface FrameUser {
  userId: string;
  usesrname: string;
}

// Sub collection of Frame
export interface FrameImageSubCollection {
  downloadUrl: string;
  userId: string;
  username: string;
}


