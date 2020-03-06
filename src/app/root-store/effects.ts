import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import * as AuthenticationActions from './actions';
import {  map, catchError, exhaustMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { of } from 'rxjs';

@Injectable()
export class RootEffects {
    constructor(private actions$: Actions, private authenticationService: AuthenticationService) { }

    createEmailUser$ = createEffect(() => this.actions$.pipe(
        ofType(AuthenticationActions.CreateEmailUserRequest),
        exhaustMap((action) => {
            return this.authenticationService.createEmailUser(action.newUserRequest).pipe(
                map((user: User) => AuthenticationActions.CreateEmailUserRequestSuccess({ user })),
                catchError((error: Error) => of(AuthenticationActions.CreateEmailUserRequestFailure({ errorMessage: error.message })))
            );
        })
    ));
}
