import { createAction, props } from '@ngrx/store';

export function createDefaultRequestActions<R, S, E>(description: string) {
  return {
    Request: createAction(`${description} Request`, props<{ request: R }>()),
    RequestSuccess: createAction(`${description} Request Success`, props<{ successResponse: S }>()),
    RequestFailure: createAction(`${description} Request Failure`, props<{ failureResponse: E }>()),
  };
}
