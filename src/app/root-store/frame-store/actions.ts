import { createAction, props } from '@ngrx/store';
import { UserFrameMetadata } from 'src/app/shared/models/firebase-collections/user';
import { CreateFrameImageRequest } from 'src/app/shared/models/requests/frameRequests';
import { FrameImageModel, FrameModel } from 'src/app/shared/models/view-models/frameModel';
import { createDefaultRequestActions } from '../shared/actionFactory';
import { ModalTypes } from './state';


export const NewFrame =
  createDefaultRequestActions<string, FrameModel, string>('[Frame] Create New Frame');
export const NewFrameImage =
  createDefaultRequestActions<CreateFrameImageRequest, FrameImageModel, string>('[Frame] Create New Image');
export const SelectFrame =
  createDefaultRequestActions<string, string, string>('[Frame] Select Frame');
export const LoadFrame =
  createDefaultRequestActions<string, FrameModel, string>('[Frame] Load Frame');
export const JoinFrame =
  createDefaultRequestActions<string, UserFrameMetadata, string>('[Frame] Join Frame');
export const JoinFrameNoOp =
  createAction('[Frame] Join Frame NoOp');

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


export const UpdateSideNavVisibility =
  createAction('[Frame] Update SideNav Visibility', props<{ visible: boolean }>());
export const UpdateActiveModal =
  createAction('[Frame] Update Active Modal', props<{ activeModal: ModalTypes }>())


