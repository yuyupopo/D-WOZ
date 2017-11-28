import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AgentReducer, AgentState } from './agent-reducer';
import * as fromRoot from '../../reducer';


export interface State extends fromRoot.State {
    'agent': AgentState;
}
export const reducers = {
    agent: AgentReducer,
};


export const getAgentState = createFeatureSelector<AgentState>('agent');

export const getAgentList = createSelector(getAgentState,
    (state: AgentState) => state.agentList);
