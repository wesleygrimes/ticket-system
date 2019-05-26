import { User } from '../../_models';
import * as fromActions from './actions';
import { featureReducer } from './reducer';
import * as fromSelectors from './selectors';
import * as fromState from './state';

const mockUser1: User = {
  id: 1,
  name: 'Mock User 1'
};

const mockUser2: User = {
  id: 2,
  name: 'Mock User 2'
};

const mockInitialState = fromState.initialState;

describe('Incident Store', () => {
  describe('Actions', () => {
    describe('undefined action', () => {
      it('should return the expected state', () => {
        const result = featureReducer(undefined, {} as any);
        expect(result).toEqual(mockInitialState);
      });
    });

    describe('LOAD_USERS', () => {
      it('should return the expected state', () => {
        const inputAction: fromActions.ActionsUnion = {
          type: fromActions.ActionTypes.LOAD_USERS
        };

        const expectedState: fromState.State = {
          ...mockInitialState,
          isLoading: true,
          error: null
        };

        const result = featureReducer(mockInitialState, inputAction);
        expect(result).toEqual(expectedState);
      });
    });

    describe('LOAD_USERS_SUCCESS', () => {
      it('should return the expected state', () => {
        const inputAction: fromActions.ActionsUnion = {
          type: fromActions.ActionTypes.LOAD_USERS_SUCCESS,
          payload: {
            users: [mockUser1, mockUser2]
          }
        };

        const expectedState: fromState.State = {
          isLoading: false,
          error: null,
          ids: [mockUser1.id, mockUser2.id],
          entities: {
            [mockUser1.id]: mockUser1,
            [mockUser2.id]: mockUser2
          }
        };

        const result = featureReducer(mockInitialState, inputAction);
        expect(result).toEqual(expectedState);
      });
    });

    describe('LOAD_USERS_FAILURE', () => {
      it('should return the expected state', () => {
        const expectedError = 'OOPS';

        const inputAction: fromActions.ActionsUnion = {
          type: fromActions.ActionTypes.LOAD_USERS_FAILURE,
          payload: {
            error: expectedError
          }
        };

        const expectedState: fromState.State = {
          isLoading: false,
          error: expectedError,
          ids: [],
          entities: {}
        };

        const result = featureReducer(mockInitialState, inputAction);
        expect(result).toEqual(expectedState);
      });
    });
  });

  describe('Selectors', () => {
    describe('selectUserIsLoading', () => {
      it('should return true if state value is true', () => {
        const expectedValue = true;
        const inputState: fromState.State = {
          ...mockInitialState,
          isLoading: true
        };
        expect(fromSelectors.selectUserIsLoading.projector(inputState)).toBe(
          expectedValue
        );
      });

      it('should return false if state value is false', () => {
        const expectedValue = false;
        const inputState: fromState.State = {
          ...mockInitialState,
          isLoading: false
        };
        expect(fromSelectors.selectUserIsLoading.projector(inputState)).toBe(
          expectedValue
        );
      });

      it('should return false if state value is null', () => {
        const expectedValue = false;
        const inputState: fromState.State = {
          ...mockInitialState,
          isLoading: null
        };
        expect(fromSelectors.selectUserIsLoading.projector(inputState)).toBe(
          expectedValue
        );
      });
    });

    describe('selectUserError', () => {
      it('should return error if state value is error', () => {
        const expectedValue = 'OOPS';

        const inputState: fromState.State = {
          ...mockInitialState,
          error: expectedValue
        };
        expect(fromSelectors.selectUserError.projector(inputState)).toEqual(
          expectedValue
        );
      });

      it('should return null if state value is null', () => {
        const expectedValue = null;
        const inputState: fromState.State = {
          ...mockInitialState,
          error: null
        };
        expect(fromSelectors.selectUserError.projector(inputState)).toEqual(
          expectedValue
        );
      });
    });
  });
});
