import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AgentReducer, AgentState } from './agent-reducer';
import * as fromRoot from '../../shared/reducer';


export interface State extends fromRoot.State {
    'agent': AgentState;
}
export const reducer = {
    agent: AgentReducer,
};

export const getAgent = createFeatureSelector<State>('agent');

export const getAgentState = createSelector(getAgent, (state: State) => state.agent);

export const getAgentList = createSelector(getAgentState, (state: AgentState) => state.agentList);
export const getSelectedAgent = createSelector(getAgentState, (state: AgentState) => state.selectedAgent);
export const getTriggerList = createSelector(getAgentState, (state: AgentState) => state.triggerList);
export const getDialogList = createSelector(getAgentState, (state: AgentState) => state.dialogList);
export const getBehaviorList = createSelector(getAgentState, (state: AgentState) => state.behaviorList);
