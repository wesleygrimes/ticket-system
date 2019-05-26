import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Ticket, TicketFilter } from '../../_models';

export enum ActionTypes {
  LOAD_TICKETS = '[Tickets] Load Users',
  LOAD_TICKETS_SUCCESS = '[Ticket API] Load Tickets Success',
  LOAD_TICKETS_FAILURE = '[Ticket API] Load Tickets Failure',

  ADD_TICKET = '[List Screen] Add Ticket',
  ADD_TICKET_SUCCESS = '[Ticket API] Add Ticket Success',
  ADD_TICKET_FAILURE = '[Ticket API] Add Ticket Failure',

  FILTER_TICKETS = '[List Screen] Filter Tickets',

  ASSIGN_TICKET = '[Details Screen] Assign Ticket Request',
  ASSIGN_TICKET_SUCCESS = '[Details Screen] Assign Ticket Success',
  ASSIGN_TICKET_FAILURE = '[Details Screen] Assign Ticket Failure',

  COMPLETE_TICKET = '[Details Screen] Complete Ticket Request',
  COMPLETE_TICKET_SUCCESS = '[Details Screen] Complete Ticket Success',
  COMPLETE_TICKET_FAILURE = '[Details Screen] Complete Ticket Failure',

  SELECT_TICKET = '[List Screen] Select Ticket'
}

export class LoadTicketsAction implements Action {
  readonly type = ActionTypes.LOAD_TICKETS;
}

export class LoadTicketsSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_TICKETS_SUCCESS;
  constructor(public payload: { tickets: Ticket[] }) {}
}

export class LoadTicketsFailureAction implements Action {
  readonly type = ActionTypes.LOAD_TICKETS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class AddTicketAction implements Action {
  readonly type = ActionTypes.ADD_TICKET;
  constructor(public payload: { newTicket: Ticket }) {}
}

export class AddTicketSuccessAction implements Action {
  readonly type = ActionTypes.ADD_TICKET_SUCCESS;
  constructor(public payload: { ticket: Ticket }) {}
}

export class AddTicketFailureAction implements Action {
  readonly type = ActionTypes.ADD_TICKET_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class FilterTicketsAction implements Action {
  readonly type = ActionTypes.FILTER_TICKETS;
  constructor(public payload: { filter: TicketFilter }) {}
}

export class AssignTicketAction implements Action {
  readonly type = ActionTypes.ASSIGN_TICKET;
  constructor(public payload: { ticketId: number; userId: number }) {}
}

export class AssignTicketSuccessAction implements Action {
  readonly type = ActionTypes.ASSIGN_TICKET_SUCCESS;
  constructor(public payload: { ticket: Update<Ticket> }) {}
}

export class AssignTicketFailureAction implements Action {
  readonly type = ActionTypes.ASSIGN_TICKET_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class CompleteTicketAction implements Action {
  readonly type = ActionTypes.COMPLETE_TICKET;
  constructor(public payload: { ticketId: number }) {}
}

export class CompleteTicketSuccessAction implements Action {
  readonly type = ActionTypes.COMPLETE_TICKET_SUCCESS;
  constructor(public payload: { ticket: Update<Ticket> }) {}
}

export class CompleteTicketFailureAction implements Action {
  readonly type = ActionTypes.COMPLETE_TICKET_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class SelectTicketAction implements Action {
  readonly type = ActionTypes.SELECT_TICKET;
  constructor(public payload: { ticketId: number }) {}
}

export type ActionsUnion =
  | LoadTicketsAction
  | LoadTicketsFailureAction
  | LoadTicketsSuccessAction
  | AddTicketAction
  | AddTicketSuccessAction
  | AddTicketFailureAction
  | FilterTicketsAction
  | AssignTicketAction
  | AssignTicketSuccessAction
  | AssignTicketFailureAction
  | CompleteTicketAction
  | CompleteTicketSuccessAction
  | CompleteTicketFailureAction
  | SelectTicketAction;
