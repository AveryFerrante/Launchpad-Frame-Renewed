import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import * as AuthenticationActions from './actions';
import {  map, catchError, exhaustMap, switchMap, mapTo, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/firebase-collections/user';
import { of, pipe, OperatorFunction, Observable } from 'rxjs';
import { UsernameService } from '../shared/services/username/username.service';
import { NewUserRequest } from '../shared/models/requests/NewUserRequest';
import { BatchActionOrchestrator } from '../shared/models/batchActionOrchestrator';

@Injectable()
export class RootEffects {
    constructor(private actions$: Actions,
                private authenticationService: AuthenticationService,
                private usernameService: UsernameService) { }

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
        const userRecordsCreation$ = this.orchestrateCreationOfNewUserRecords(user).pipe(mapTo(user));
        return this.mapObservableTo<User>(userRecordsCreation$, user);
      });
    }

    private orchestrateCreationOfNewUserRecords(user: User) {
        const batchOrchestrator = new BatchActionOrchestrator();
        batchOrchestrator.appendSetAction(this.authenticationService.getUserDocumentSetBatchAction(user));
        batchOrchestrator.appendSetAction(this.usernameService.getUsernameDocumentSetBatchAction(user.id, user.username));
        return batchOrchestrator.executeActions();
    }

    private mapObservableTo<T>(observable: Observable<any>, mapToValue: T) {
      return observable.pipe(mapTo(mapToValue));
    }
}
