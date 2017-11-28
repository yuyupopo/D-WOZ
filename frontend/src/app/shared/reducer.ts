import { UserReducer, UserState } from '../user/reducers/user-reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface State {
  user: UserState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  user: UserReducer,
  router: routerReducer,
};

export const getUserState = createFeatureSelector<UserState>('user');


