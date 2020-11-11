import { createAction, props } from '@ngrx/store';
import { CreateFrameImageRequest, CreateFrameRequest } from 'src/app/shared/models/requests/FrameRequests';
import { FrameImageModel, FrameModel } from 'src/app/shared/models/view-models/frameModel';
import { createDefaultRequestActions } from '../shared/actionFactory';


export const NewFrame =
  createDefaultRequestActions<string, FrameModel, string>('[Frame] Create New Frame');
export const NewFrameImage =
  createDefaultRequestActions<CreateFrameImageRequest, FrameImageModel, string>('[Frame] Create New Image');
export const SelectFrame =
  createDefaultRequestActions<string, string, string>('[Frame] Select Frame');
export const LoadFrame =
  createDefaultRequestActions<string, FrameModel, string>('[Frame] Load Frame');

export const UpdateSideNavVisibility =
  createAction('[Frame] Update SideNav Visibility', props<{ visible: boolean }>());
export const UploadImagesRequest =
  createAction('[Frame] Upload Images', props<{ Images: File[] }>());
export const UpdateUploadPercentageRequest =
  createAction('[Frame] Update Image Upload Percentage Request', props<{ percentage: number }>());

export const LiveImageListenerRequest =
  createAction('[Frame] Live Image Listener Request');
export const LiveImageListenerNewImages =
  createAction('[Frame] Live Image Listener Request Success', props<{ newImages: FrameImageModel[] }>());
export const LiveImageListenerStopRequest =
  createAction('[Frame] Live Image Listener Stop Request');



