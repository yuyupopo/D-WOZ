import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExperimentReducer, ExperimentState } from './experiment-reducer';
import * as fromRoot from '../../shared/reducer';


export interface State extends fromRoot.State {
    'experiment': ExperimentState;
}

export const reducer = {
    experiment: ExperimentReducer,
};

export const getExperiment = createFeatureSelector<State>('experiment');

export const getExperimentState = createSelector(getExperiment, (state: State) => state.experiment);


export const getExperimentList = createSelector(getExperimentState, (state: ExperimentState) => state.experimentList);
export const getSelectedExperiment = createSelector(getExperimentState, (state: ExperimentState) => state.selectedExperiment);
export const getSelectedExperimentAgents = createSelector(getExperimentState, (state: ExperimentState) => state.agents);

export const getTestLink = createSelector(getExperimentState, (state: ExperimentState) => state.testLink);

export const isTesting = createSelector(getExperimentState, (state: ExperimentState) => state.isTested);
export const isException = createSelector(getExperimentState, (state: ExperimentState) => state.isException);
export const getBehavior = createSelector(getExperimentState, (state: ExperimentState) => state.behavior);
export const getHypothesisList = createSelector(getExperimentState, (state: ExperimentState) => state.hypothesisList);
export const getAction = createSelector(getExperimentState, (state: ExperimentState) => state.action);

