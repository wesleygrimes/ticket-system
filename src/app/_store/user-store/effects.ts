import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TicketService } from '../../_services';
import { serializeError } from '../../_utils/serialize-error';
import * as featureActions from './actions';

@Injectable()
export class UserStoreEffects {
  constructor(
    private actions$: Actions,
    private ticketService: TicketService
  ) {}

  @Effect()
  loadUsersEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadUsersAction>(
      featureActions.ActionTypes.LOAD_USERS
    ),
    switchMap(() =>
      this.ticketService.users().pipe(
        map(
          users =>
            new featureActions.LoadUsersSuccessAction({
              users
            })
        ),
        catchError(error =>
          observableOf(
            new featureActions.LoadUsersFailureAction({
              error: serializeError(error).message
            })
          )
        )
      )
    )
  );
}
