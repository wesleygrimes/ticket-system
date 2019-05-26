import { ActionsUnion, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(
  state = initialState,
  action: ActionsUnion
): State {
  switch (action.type) {
    case ActionTypes.LOAD_USERS: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_USERS_SUCCESS: {
      return featureAdapter.addAll(action.payload.users, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.LOAD_USERS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}
