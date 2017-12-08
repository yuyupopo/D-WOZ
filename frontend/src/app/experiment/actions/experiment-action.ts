import { Action } from '@ngrx/store';
import * as ExperimentModel from '../model/experiment';
import * as AgentModel from '../../agent/model/agent';

export const LOAD = '[Experiments] Load';
export const LOAD_COMPLETE = '[Experiments] load Complete';
export const LOAD_ERROR = '[Experiments] load Error';

export const LOAD_AGENT = '[Agent] Load';
export const LOAD_AGENT_COMPLETE = '[Agent] load Complete';
export const LOAD_AGENT_ERROR = '[Agent] load Error';

export const SELECT = '[Experiment] Select';

export const CREATE = '[Experiment] create';
export const CREATE_COMPLETE = '[Experiment] create Complete';
export const CREATE_ERROR = '[Experiment] create Error';

export const EDIT = '[Experiment] edit';
export const EDIT_COMPLETE = '[Experiment] edit Complete';
export const EDIT_ERROR = '[Experiment] edit Error';

export const DELETE = '[Experiment] delete';
export const DELETE_COMPLETE = '[Experiment] delete Complete';
export const DELETE_ERROR = '[Experiment] delete Error';

export class Load implements Action {
    readonly type = LOAD;
    constructor(public payload ?: void) {}
}

export class LoadComplete implements Action {
    readonly type = LOAD_COMPLETE;
    constructor(public payload: ExperimentModel.Experiment[]) {}
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
    constructor(public payload: ExperimentModel.Experiment) {}
}

export class Create implements Action {
    readonly type = CREATE;
    constructor(public payload: ExperimentModel.Experiment) {}
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
