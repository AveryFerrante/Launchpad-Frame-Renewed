import { Frame } from 'src/app/shared/models/firebase-collections/frame';
import { NewFrameRequest } from 'src/app/shared/models/requests/newFrameRequest';
import { createDefaultRequestActions } from '../shared/actionFactory';


export const NewFrame =
  createDefaultRequestActions<NewFrameRequest, Frame, string>('[Frame] Create New Frame');
