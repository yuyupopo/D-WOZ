import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { AgentReducer, AgentState } from './agent-reducer';

export interface State {
  agent: AgentState;
  router: RouterReducerState;
}
export const reducers = {
  agent: AgentReducer,
  router: routerReducer,
};
