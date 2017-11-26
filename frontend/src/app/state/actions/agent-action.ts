import { Action } from '@ngrx/store';
import * as AgentModel from '../model/agent';

export const LOAD = '[Bubble] Load';
export const LOAD_COMPLETE = '[Bubble] load Complete';
export const LOAD_ERROR = '[Bubble] load Error';

export const SELECT = '[Bubble] Select';

export const CREATE = '[Bubble] create';
export const CREATE_COMPLETE = '[Bubble] create Complete';
export const CREATE_ERROR = '[Bubble] create Error';

export const EDIT = '[Bubble] edit';
export const EDIT_COMPLETE = '[Bubble] edit Complete';
export const EDIT_ERROR = '[Bubble] edit Error';

export const DELETE = '[Bubble] delete';
export const DELETE_COMPLETE = '[Bubble] delete Complete';
export const DELETE_ERROR = '[Bubble] delete Error';

export class Load implements Action {
  readonly type = LOAD;
  constructor(public payload: void) {}
}

export class LoadComplete implements Action {
  readonly type = LOAD_COMPLETE;
  constructor(public payload: AgentModel.Agent[]) {}
}

export class LoadError implements Action {
  readonly type = LOAD_ERROR;
  constructor(public payload: string) {}
}

export class Select implements Action {
  readonly type = SELECT;
  constructor(public payload: AgentModel.Agent) {}
}

export type Actions =
  | Load
  | LoadComplete
  | LoadError
  | Select;
