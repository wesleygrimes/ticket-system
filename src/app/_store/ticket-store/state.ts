import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Ticket, TicketFilter } from '../../_models';

export const featureAdapter = createEntityAdapter<Ticket>({
  selectId: model => model.id
});

export interface State extends EntityState<Ticket> {
  isLoading: boolean;
  error: string;
  currentFilter: TicketFilter;
  currentTicketId: number;
}

export const initialState: State = featureAdapter.getInitialState({
  isLoading: false,
  error: null,
  currentFilter: {
    assigneeId: null,
    completed: null
  },
  currentTicketId: null
});
