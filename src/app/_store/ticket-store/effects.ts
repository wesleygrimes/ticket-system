import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { TicketService } from '../../_services';
import { serializeError } from '../../_utils/serialize-error';
import * as featureActions from './actions';

@Injectable()
export class TicketStoreEffects {
  constructor(
    private actions$: Actions,
    private ticketService: TicketService
  ) {}

  @Effect()
  loadTicketsEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadTicketsAction>(
      featureActions.ActionTypes.LOAD_TICKETS
    ),
    switchMap(() =>
      this.ticketService.tickets().pipe(
        map(
          tickets =>
            new featureActions.LoadTicketsSuccessAction({
              tickets
            })
        ),
        catchError(error =>
          observableOf(
            new featureActions.LoadTicketsFailureAction({
              error: serializeError(error).message
            })
          )
        )
      )
    )
  );

  @Effect()
  addTicketEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.AddTicketAction>(
      featureActions.ActionTypes.ADD_TICKET
    ),
    map(action => action.payload),
    concatMap(({ newTicket }) =>
      this.ticketService.newTicket(newTicket).pipe(
        map(
          ticket =>
            new featureActions.AddTicketSuccessAction({
              ticket
            })
        ),
        catchError(error =>
          observableOf(
            new featureActions.AddTicketFailureAction({
              error: serializeError(error).message
            })
          )
        )
      )
    )
  );

  @Effect()
  assignTicketEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.AssignTicketAction>(
      featureActions.ActionTypes.ASSIGN_TICKET
    ),
    map(action => action.payload),
    concatMap(({ ticketId, userId }) =>
      this.ticketService.assign(ticketId, userId).pipe(
        map(
          assignedTicket =>
            new featureActions.AssignTicketSuccessAction({
              ticket: { changes: assignedTicket, id: assignedTicket.id }
            })
        ),
        catchError(error =>
          observableOf(
            new featureActions.AssignTicketFailureAction({
              error: serializeError(error).message
            })
          )
        )
      )
    )
  );

  @Effect()
  completeTicketEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.CompleteTicketAction>(
      featureActions.ActionTypes.COMPLETE_TICKET
    ),
    map(action => action.payload),
    concatMap(({ ticketId }) =>
      this.ticketService.complete(ticketId, true).pipe(
        map(
          completedTicket =>
            new featureActions.CompleteTicketSuccessAction({
              ticket: { changes: completedTicket, id: completedTicket.id }
            })
        ),
        catchError(error =>
          observableOf(
            new featureActions.CompleteTicketFailureAction({
              error: serializeError(error).message
            })
          )
        )
      )
    )
  );
}
