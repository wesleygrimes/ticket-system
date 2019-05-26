import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../_models';

export const featureAdapter = createEntityAdapter<User>({
  selectId: model => model.id
});

export interface State extends EntityState<User> {
  isLoading: boolean;
  error: string;
}

export const initialState: State = featureAdapter.getInitialState({
  isLoading: false,
  error: null
});
