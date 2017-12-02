import { Action } from '@ngrx/store';

import * as AgentModel from '../model/agent';

import * as fromAgent from '../actions/agent-action';
import { AgentService } from '../service/agent.service';

export interface AgentState {
    agentList: AgentModel.Agent[];
    triggerList: AgentModel.Trigger[];
    dialogList: AgentModel.Dialog[];
    actionList: AgentModel.Action[];
    behaviorList: AgentModel.Behavior[];
    selectedAgent: AgentModel.Agent;
    loading: boolean;
    error: string;
}

const initialState: AgentState = {
    agentList: [],
    triggerList: [],
    dialogList: [],
    actionList: [],
    behaviorList: [],
    selectedAgent: null,
    loading: false,
    error: ''
};

export function AgentReducer(state: AgentState = initialState, action: fromAgent.Actions) {
    switch (action.type) {
        case fromAgent.SELECT:
            return {...state, selectedAgent: action.payload};
        case fromAgent.LOAD:
            return {...state, loading: true};
        case fromAgent.LOAD_COMPLETE:
            return {...state, agentList: action.payload, loading: false};
        case fromAgent.LOAD_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    }
}
