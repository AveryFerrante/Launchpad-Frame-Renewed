import { FrameCollection, FrameImageSubCollection } from '../firebase-collections/frameCollection';

export interface CreateFrameRequest extends BaseRequest<FrameCollection> { }

export interface CreateFrameImageRequest extends BaseRequest<FrameImageSubCollection> {
  frameId: string;
}

interface BaseRequest<T> {
  id: string;
  data: T;
}
