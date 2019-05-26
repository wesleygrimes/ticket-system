import { ActionsUnion, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(
  state = initialState,
  action: ActionsUnion
): State {
  switch (action.type) {
    case ActionTypes.LOAD_TICKETS: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_TICKETS_SUCCESS: {
      return featureAdapter.addAll(action.payload.tickets, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.LOAD_TICKETS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case ActionTypes.ADD_TICKET: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.ADD_TICKET_SUCCESS: {
      return featureAdapter.addOne(action.payload.ticket, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.ADD_TICKET_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case ActionTypes.ASSIGN_TICKET: {
      return {
        ...state,
        error: null
      };
    }
    case ActionTypes.ASSIGN_TICKET_SUCCESS: {
      return featureAdapter.updateOne(action.payload.ticket, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.ASSIGN_TICKET_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case ActionTypes.COMPLETE_TICKET: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.COMPLETE_TICKET_SUCCESS: {
      return featureAdapter.updateOne(action.payload.ticket, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.COMPLETE_TICKET_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case ActionTypes.SELECT_TICKET: {
      return {
        ...state,
        currentTicketId: action.payload.ticketId
      };
    }
    case ActionTypes.FILTER_TICKETS: {
      return {
        ...state,
        currentFilter: action.payload.filter
      };
    }
    default: {
      return state;
    }
  }
}
