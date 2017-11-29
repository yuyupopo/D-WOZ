import { Action } from '@ngrx/store';

import * as ExperimentModel from '../model/experiment';

import * as fromExperiment from '../actions/experiment-action';

export interface ExperimentState {
    experimentList: ExperimentModel.Experiment[];
    selectedExperiment: ExperimentModel.Experiment;
    loading: boolean;
    error: string;
}

const initialState: ExperimentState = {
    experimentList: [],
    selectedExperiment: null,
    loading: false,
    error: ''
};

export function ExperimentReducer(state: ExperimentState = initialState, action: fromExperiment.Actions) {
    switch (action.type) {
        case fromExperiment.SELECT:
            return {...state, selectedExperiment: action.payload};
        case fromExperiment.LOAD:
            return {...state, loading: true};
        case fromExperiment.LOAD_COMPLETE:
            return {...state, experimentList: action.payload, loading: false};
        case fromExperiment.LOAD_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    }
}
