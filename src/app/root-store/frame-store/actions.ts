import { createAction, props } from '@ngrx/store';
import { CreateFrameImageRequest, CreateFrameRequest } from 'src/app/shared/models/requests/FrameRequests';
import { FrameImageModel, FrameModel } from 'src/app/shared/models/view-models/frameModel';
import { createDefaultRequestActions } from '../shared/actionFactory';


export const NewFrame =
  createDefaultRequestActions<CreateFrameRequest, FrameModel, string>('[Frame] Create New Frame');
export const NewFrameImage =
  createDefaultRequestActions<CreateFrameImageRequest, FrameImageModel, string>('[Frame] Create New Image');
export const SelectFrame =
  createDefaultRequestActions<string, string, string>('[Frame] Select Frame');
export const LoadFrame =
  createDefaultRequestActions<string, FrameModel, string>('[Frame] Load Frame');
export const UploadImagesRequest =
  createAction('[Frame] Upload Images', props<{ Images: File[] }>());
export const UpdateUploadPercentageRequest =
  createAction('[Frame] Update Image Upload Percentage Request', props<{ percentage: number }>());



