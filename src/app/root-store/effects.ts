import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import * as AuthenticationActions from './actions';
import {  map, catchError, exhaustMap, switchMap, mapTo } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { of } from 'rxjs';
import { BatchHelperService } from '../shared/services/helpers/batch-helper.service';
import { BatchAction } from '../shared/models/batchAction';

@Injectable()
export class RootEffects {
    constructor(private actions$: Actions,
                private authenticationService: AuthenticationService,
                private batchHelper: BatchHelperService) { }

    createEmailUser$ = createEffect(() => this.actions$.pipe(
        ofType(AuthenticationActions.CreateEmailUserRequest),
        exhaustMap((action) => {
            return this.authenticationService.createEmailUser(action.newUserRequest).pipe(
                switchMap((user: User) => {
                  const batchActions: BatchAction[] = [
                    this.authenticationService.createUserDocumentBatchAction(user.id, action.newUserRequest)
                  ];
                  return this.batchHelper.executeBatch(batchActions).pipe(mapTo(user));
                }),
                map((user: User) => AuthenticationActions.CreateEmailUserRequestSuccess({ user })),
                catchError((error: Error) => of(AuthenticationActions.CreateEmailUserRequestFailure({ errorMessage: error.message })))
            );
        })
    ));
}
