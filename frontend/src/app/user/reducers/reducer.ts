import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserReducer, UserState } from './user-reducer';
import * as fromRoot from '../../shared/reducer';


export interface State extends fromRoot.State {
    'user': UserState;
}
export { UserReducer };

export const getUserState = createFeatureSelector<UserState>('agent');

export const getSignedInState = createSelector(getUserState,
    (state: UserState) => state.signedIn);
