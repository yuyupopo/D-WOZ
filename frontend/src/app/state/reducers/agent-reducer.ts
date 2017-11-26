import { Action } from '@ngrx/store';

import * as AgentModel from '../model/agent';

import * as fromAgent from '../actions/agent-action';
import { AgentService } from '../service/agent.service';

export interface AgentState {
  agentList: AgentModel.Agent[];
  selectedAgent: AgentModel.Agent;
  loading: boolean;
  error: string;
}

const initialState: AgentState = {
  agentList: [],
  selectedAgent: null,
  loading: false,
  error: ''
};

export function AgentReducer(state: AgentState = initialState, action: fromAgent.Actions) {
  switch (action.type) {
    case fromAgent.SELECT:
      return {...state, selectedBubble: action.payload};
    case fromAgent.LOAD_COMPLETE:
      return {...state, rootBubble: action.payload, loading: false};
    default:
      return state;
  }
}

export const getAgentList = (state: AgentState) => state.agentList;
