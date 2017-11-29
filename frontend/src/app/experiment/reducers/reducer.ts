import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExperimentReducer, ExperimentState } from './experiment-reducer';
import * as fromRoot from '../../shared/reducer';


export interface State extends fromRoot.State {
    'experiment': ExperimentState;
}
export { ExperimentReducer };

export const getExperimentState = createFeatureSelector<ExperimentState>('experiment');

export const getExperimentList = createSelector(getExperimentState, (state: ExperimentState) => state.experimentList);
export const getSelectedExperiment = createSelector(getExperimentState, (state: ExperimentState) => state.selectedExperiment);
