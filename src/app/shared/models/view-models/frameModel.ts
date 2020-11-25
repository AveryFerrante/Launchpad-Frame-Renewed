import { FrameCollection, FrameImageSubCollection } from '../firebase-collections/frameCollection';


export interface FrameModel extends FrameCollection {
  id: string;
  images: FrameImageModel[];
}

export interface FrameImageModel extends FrameImageSubCollection {
  id: string;
}
