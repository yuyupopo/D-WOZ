import { Action } from '@ngrx/store';

import * as ExperimentModel from '../model/experiment';
import * as AgentModel from '../../agent/model/agent';

import * as fromExperiment from '../actions/experiment-action';

export interface ExperimentState {
    testLink: string;
    experimentList: ExperimentModel.Experiment[];
    agents: AgentModel.Agent[];
    selectedExperiment: ExperimentModel.Experiment;

    isTested: boolean;
    isException: boolean;
    behavior: string;
    hypothesisList: string[];
    action: string;

    loading: boolean;
    error: string;
}

const initialState: ExperimentState = {
    testLink: '',
    experimentList: [],
    agents: [],
    selectedExperiment: null,

    isTested: false,
    isException: false,
    behavior: '',
    hypothesisList: [],
    action: '',


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

        case fromExperiment.TEST_START:
            return {...state, isTested: true};

        case fromExperiment.TEST_RESPONSE_SUCCESS:
            return {...state, behavior: action.payload.behavior, action: action.payload.action,
                isExcpetion: false};
        case fromExperiment.TEST_RESPONSE_FAIL:
            return {...state, behavior: action.payload.behavior,
                hypothesisList: action.payload.hypothesisList, error: action.payload.err, isException: true};
        case fromExperiment.TEST_END:
            return {...state, isTested: false};
        default:
            return state;
    }
}
