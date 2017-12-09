import { Action } from '@ngrx/store';

import * as ExperimentModel from '../model/experiment';
import * as AgentModel from '../../agent/model/agent';

import * as fromExperiment from '../actions/experiment-action';

export interface ExperimentState {
    testLink: string;
    experimentList: ExperimentModel.Experiment[];
    agents: AgentModel.Agent[];
    selectedExperiment: ExperimentModel.Experiment;
    loading: boolean;
    error: string;
}

const initialState: ExperimentState = {
    testLink: '',
    experimentList: [],
    agents: [],
    selectedExperiment: null,
    loading: false,
    error: ''
};

export function ExperimentReducer(state: ExperimentState = initialState, action: fromExperiment.Actions) {
    switch (action.type) {
        case fromExperiment.CLEAR:
            return {...initialState};

        case fromExperiment.SELECT:
            return {...state, selectedExperiment: action.payload};
        case fromExperiment.LOAD:
            return {...state, loading: true};
        case fromExperiment.LOAD_COMPLETE:
            return {...state, experimentList: action.payload, loading: false};
        case fromExperiment.LOAD_ERROR:
            return {...state, error: action.payload};

        case fromExperiment.LOAD_AGENT:
            return {...state, loading: true};
        case fromExperiment.LOAD_AGENT_COMPLETE:
            console.log(action.payload);
            return {...state, loading: false, agents: action.payload };

        case fromExperiment.CREATE_TEST:
            return {...state, loading: true};
        case fromExperiment.CREATE_TEST_COMPLETE:
            return {...state, testLink: action.payload, loading: false};
        case fromExperiment.CREATE_ERROR:
            return {...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
