import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../_models';
import { featureAdapter, State } from './state';

export const selectUserState = createFeatureSelector<State>('users');

export const selectAllUserItems: (
  state: object
) => User[] = featureAdapter.getSelectors(selectUserState).selectAll;

export const selectUserError = createSelector(
  selectUserState,
  (state: State): any => state.error
);

export const selectUserIsLoading = createSelector(
  selectUserState,
  (state: State): boolean => state.isLoading || false
);
