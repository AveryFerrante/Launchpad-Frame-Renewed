import { CreateFrameImageRequest, CreateFrameRequest } from 'src/app/shared/models/requests/FrameRequests';
import { FrameImageModel, FrameModel } from 'src/app/shared/models/view-models/frameModel';
import { createDefaultRequestActions } from '../shared/actionFactory';


export const NewFrame =
  createDefaultRequestActions<CreateFrameRequest, FrameModel, string>('[Frame] Create New Frame');
export const NewFrameImage =
  createDefaultRequestActions<CreateFrameImageRequest, FrameImageModel, string>('[Frame] Create New Image');
