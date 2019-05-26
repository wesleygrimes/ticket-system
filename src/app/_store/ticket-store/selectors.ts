import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Ticket, TicketFilter } from '../../_models';
import { featureAdapter, State } from './state';

export const selectTicketState = createFeatureSelector<State>('tickets');

export const selectAllTicketItems: (
  state: object
) => Ticket[] = featureAdapter.getSelectors(selectTicketState).selectAll;

export const selectTicketError = createSelector(
  selectTicketState,
  (state: State): any => state.error
);

export const selectTicketIsLoading = createSelector(
  selectTicketState,
  (state: State): boolean => state.isLoading 
);

export const selectTicketCurrentTicketId = createSelector(
  selectTicketState,
  (state: State): number => state.currentTicketId
);

export const selectTicketCurrentFilter = createSelector(
  selectTicketState,
  (state: State): TicketFilter => state.currentFilter
);

export const selectFilteredTicketItems = createSelector(
  selectTicketCurrentFilter,
  selectAllTicketItems,
  (currentFilter: TicketFilter, items: Ticket[]): Ticket[] => {
    return items
      .filter(
        item =>
          currentFilter.assigneeId === null ||
          item.assigneeId === currentFilter.assigneeId
      )
      .filter(
        item =>
          currentFilter.completed === null ||
          item.completed === currentFilter.completed
      );
  }
);

export const selectCurrentTicket = createSelector(
  selectTicketCurrentTicketId,
  selectAllTicketItems,
  (currentTicketId: number, items: Ticket[]): Ticket => {
    return items.find(i => i.id === currentTicketId);
  }
);
