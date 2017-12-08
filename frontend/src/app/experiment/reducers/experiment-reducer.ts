import { Action } from '@ngrx/store';

import * as ExperimentModel from '../model/experiment';
import * as AgentModel from '../../agent/model/agent';

import * as fromExperiment from '../actions/experiment-action';

export interface ExperimentState {
    experimentList: ExperimentModel.Experiment[];
    agentList: AgentModel.Agent[];
    selectedExperiment: ExperimentModel.Experiment;
    loading: boolean;
    error: string;
}

const initialState: ExperimentState = {
    experimentList: [],
    agentList: [],
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

        case fromExperiment.LOAD_AGENT:
            return {...state, loading: true};
        case fromExperiment.LOAD_AGENT_COMPLETE:
            console.log(action.payload);
            return {...state, loading: true, agentList: action.payload };
        default:
            return state;
    }
}
