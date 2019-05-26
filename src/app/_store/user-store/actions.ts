import { Action } from '@ngrx/store';
import { User } from '../../_models';

export enum ActionTypes {
  LOAD_USERS = '[Users] Load Users',
  LOAD_USERS_SUCCESS = '[Ticket API] Load Users Success',
  LOAD_USERS_FAILURE = '[Ticket API] Load Users Failure'
}

export class LoadUsersAction implements Action {
  readonly type = ActionTypes.LOAD_USERS;
}

export class LoadUsersSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_USERS_SUCCESS;
  constructor(public payload: { users: User[] }) {}
}

export class LoadUsersFailureAction implements Action {
  readonly type = ActionTypes.LOAD_USERS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export type ActionsUnion =
  | LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUsersFailureAction;
