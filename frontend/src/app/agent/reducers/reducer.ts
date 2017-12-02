import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AgentReducer, AgentState } from './agent-reducer';
import * as fromRoot from '../../shared/reducer';


export interface State extends fromRoot.State {
    'agent': AgentState;
}
export { AgentReducer };

export const getAgentState = createFeatureSelector<AgentState>('agent');

export const getAgentList = createSelector(getAgentState, (state: AgentState) => state.agentList);
export const getSelectedAgent = createSelector(getAgentState, (state: AgentState) => state.selectedAgent);
export const getTriggerList = createSelector(getAgentState, (state: AgentState) => state.triggerList);
export const getDialogList = createSelector(getAgentState, (state: AgentState) => state.dialogList);
export const getBehaviorList = createSelector(getAgentState, (state: AgentState) => state.behaviorList);
