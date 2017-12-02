import { Action } from '@ngrx/store';
import * as AgentModel from '../model/agent';

export const LOAD = '[Agents] Load';
export const LOAD_COMPLETE = '[Agents] load Complete';
export const LOAD_ERROR = '[Agents] load Error';

export const LOAD_AGENT = '[Agent] Load';
export const LOAD_AGENT_COMPLETE = '[Agent] load Complete';
export const LOAD_AGENT_ERROR = '[Agent] load Error';

export const SELECT = '[Agent] Select';

export const CREATE = '[Agent] create';
export const CREATE_COMPLETE = '[Agent] create Complete';
export const CREATE_ERROR = '[Agent] create Error';

export const EDIT = '[Agent] edit';
export const EDIT_COMPLETE = '[Agent] edit Complete';
export const EDIT_ERROR = '[Agent] edit Error';

export const DELETE = '[Agent] delete';
export const DELETE_COMPLETE = '[Agent] delete Complete';
export const DELETE_ERROR = '[Agent] delete Error';

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

export class LoadAgent implements Action {
    readonly type = LOAD_AGENT;
    constructor(public payload: number) {}
}

export class LoadAgentComplete implements Action {
    readonly type = LOAD_AGENT_COMPLETE;
    constructor(public payload: {
        triggers: AgentModel.Trigger[],
        dialogs: AgentModel.Dialog[],
        behaviors: AgentModel.Behavior[]
    }) {}
}

export class LoadAgentError implements Action {
    readonly type = LOAD_AGENT_ERROR;
    constructor(public payload: string) {}
}


export class Select implements Action {
    readonly type = SELECT;
    constructor(public payload: AgentModel.Agent) {}
}

export class Create implements Action {
    readonly type = CREATE;
    constructor(public payload: AgentModel.Agent) {}
}

export class CreateComplete implements Action {
    readonly type = CREATE_COMPLETE;
    constructor(public payload: void) {}
}

export class CreateError implements Action {
    readonly type = CREATE_ERROR;
    constructor(public payload: string) {}
}

export type Actions =
    | Load
    | LoadComplete
    | LoadError
    | LoadAgent
    | LoadAgentComplete
    | LoadAgentError
    | Create
    | CreateComplete
    | CreateError
    | Select;
