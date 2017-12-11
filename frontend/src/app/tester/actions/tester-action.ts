import { Action } from '@ngrx/store';

import { Experiment } from '../../experiment/model/experiment';

import * as TesterModel from '../model/tester';

export const LOAD = '[Tester] Load';
export const LOAD_COMPLETE = '[Tester] load Complete';
export const LOAD_ERROR = '[Tester] load Error';

export const SELECT = '[Tester] Select';

export const CREATE = '[Tester] create';
export const CREATE_COMPLETE = '[Tester] create Complete';
export const CREATE_ERROR = '[Tester] create Error';

export const EDIT = '[Tester] edit';
export const EDIT_COMPLETE = '[Tester] edit Complete';
export const EDIT_ERROR = '[Tester] edit Error';

export const DELETE = '[Tester] delete';
export const DELETE_COMPLETE = '[Tester] delete Complete';
export const DELETE_ERROR = '[Tester] delete Error';

export class Load implements Action {
    readonly type = LOAD;
    constructor(public payload: string) {}
}

export class LoadComplete implements Action {
    readonly type = LOAD_COMPLETE;
    constructor(public payload: TesterModel.Tester) {}
}

export class LoadError implements Action {
    readonly type = LOAD_ERROR;
    constructor(public payload: string) {}
}

export class Select implements Action {
    readonly type = SELECT;
    constructor(public payload: TesterModel.Tester) {}
}

export class Create implements Action {
    readonly type = CREATE;
    constructor(public payload: TesterModel.Tester) {}
}

export class CreateComplete implements Action {
    readonly type = CREATE_COMPLETE;
    constructor(public payload: void) {}
}

export class CreateError implements Action {
    readonly type = CREATE_ERROR;
    constructor(public payload: string) {}
}

export const NEXT = 'Next step';

export class Next implements Action {
    readonly type = NEXT;
    constructor() {}
}

export const START = 'Start test';
export const START_SUCCESS = 'Start test success';
export const START_FAIL = 'Start est fail';

export class Start implements Action {
    readonly type = START;
    constructor() {}
}

export class StartSuccess implements Action {
    readonly type = START_SUCCESS;
    constructor(public payload: Experiment) {}
}

export class StartFail implements Action {
    readonly type = START_FAIL;
    constructor(public payload: string) {}
}

export const SPEAK = 'SPEAK';
export const SPEAK_STOP = 'speak stop';
export const LISTEN = 'Listen';
export const LISTEN_STOP = 'listen stop';

export const LISTEN_SUCCESS = 'Listen success';
export const LISTEN_FAIL = 'Listen fail';

export class Speak implements Action {
    readonly type = SPEAK;
    constructor() {}
}
export class SpeakStop implements Action {
    readonly type = SPEAK_STOP;
    constructor() {}
}
export class Listen implements Action {
    readonly type = LISTEN;
    constructor() {}
}
export class ListenStop implements Action {
    readonly type = LISTEN_STOP;
    constructor(public payload: string) {}
}
export class ListenSuccess implements Action {
    readonly type = LISTEN_SUCCESS;
    constructor(public payload: string) {}
}
export class ListenFail implements Action {
    readonly type = LISTEN_FAIL;
    constructor(public payload: string) {}
}

export const END_CHAT = 'end chat';
export class EndChat implements Action {
    readonly type = END_CHAT;
    constructor() {}
}

export const END_TEST = 'end test';
export class EndTest implements Action {
    readonly type = END_TEST;
    constructor() {}
}

export type Actions =
    | Load
    | LoadComplete
    | LoadError
    | Create
    | CreateComplete
    | CreateError
    | Select
    | Next
    | Start
    | StartSuccess
    | StartFail
    | Speak
    | SpeakStop
    | Listen
    | ListenStop
    | ListenSuccess
    | ListenFail
    | EndChat
    | EndTest;
