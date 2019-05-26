import { TicketStoreState } from './ticket-store';
import { UserStoreState } from './user-store';

export interface RootState {
  tickets: TicketStoreState.State;
  users: UserStoreState.State;
}
