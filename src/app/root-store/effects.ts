import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import * as AuthenticationActions from './actions';
import {  map, catchError, exhaustMap, switchMap, mapTo, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/firebase-collections/user';
import { of, pipe, OperatorFunction } from 'rxjs';
import { BatchHelperService } from '../shared/services/helpers/batch-helper.service';
import { UsernameService } from '../shared/services/username/username.service';
import { BaseBatchAction } from '../shared/models/baseBatchAction';
import { NewUserRequest } from '../shared/models/requests/NewUserRequest';

@Injectable()
export class RootEffects {
    constructor(private actions$: Actions,
                private authenticationService: AuthenticationService,
                private usernameService: UsernameService,
                private batchHelper: BatchHelperService) { }

    createEmailUser$ = createEffect(() => this.actions$.pipe(
        ofType(AuthenticationActions.CreateEmailUserRequest),
        map((action) => action.newUserRequest),
        this.createNewEmailUserFlow(),
        this.handleNewEmailUserFlowOutcomes()
    ));

    private handleNewEmailUserFlowOutcomes() {
      return pipe(
        map((user: User) => AuthenticationActions.CreateEmailUserRequestSuccess({ user })),
        catchError((error: Error) => of(AuthenticationActions.CreateEmailUserRequestFailure({ errorMessage: error.message })))
      );
    }

    private createNewEmailUserFlow() {
      return pipe(
        this.createNewUserFromEmail(),
        this.initializeNewUserRecords(),
      );
    }

    private createNewUserFromEmail() {
      return exhaustMap((request: NewUserRequest) => this.authenticationService.createEmailUser(request));
    }

    private initializeNewUserRecords(): OperatorFunction<User, User> {
      return mergeMap((user: User) => {
        const actions = this.getCreateActionsForNewUserRecords(user);
        return this.batchHelper.executeBatchActionsWithDefinedReturnType<User>(actions, user);
      });
    }

    private getCreateActionsForNewUserRecords(user: User): BaseBatchAction[] {
        const createUserAction = this.authenticationService.getUserDocumentSetBatchAction(user);
        const createUsernameAction = this.usernameService.getUsernameDocumentSetBatchAction(user.id, user.username);
        return [createUserAction, createUsernameAction];
    }
}
