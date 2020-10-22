
export interface Frame {
  id: string;
  name: string;
  images: FrameImage[];
}

// Sub collection of Frame
interface FrameImage {
  id: string;
  imageId: string;
  userId: string;
  username: string;
}

export function createNewFrameRequest(id: string, name: string): Frame {
  return {
    id,
    name,
    images: []
  };
}
