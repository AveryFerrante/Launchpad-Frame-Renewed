import { FrameImageSubCollection } from './firebase-collections/frameCollection';
import { ImageDeminsions } from './imageDeminsions';

export interface GroupedImages {
  displayKey: string;
  images: GroupedImage[];
}

export interface GroupedImage {
  image: FrameImageSubCollection;
  displayDimensions: ImageDeminsions;
}
