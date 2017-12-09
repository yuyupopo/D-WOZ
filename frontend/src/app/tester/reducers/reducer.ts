import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TesterReducer, TesterState } from './tester-reducer';
import * as fromRoot from '../../shared/reducer';


export interface State extends fromRoot.State {
    'tester': TesterState;
}
export { TesterReducer };

export const getTesterState = createFeatureSelector<TesterState>('tester');

export const getTester = createSelector(getTesterState, (state: TesterState) => state.tester);
export const getStep = createSelector(getTesterState, (state: TesterState) => state.testPhase);
export const getError = createSelector(getTesterState, (state: TesterState) => state.error);
// export const getSelectedTester = createSelector(getTesterState, (state: TesterState) => state.selectedTester);
