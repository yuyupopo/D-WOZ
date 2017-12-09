import { Action } from '@ngrx/store';
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

export const RESTART = 'Restart test';

export class Restart implements Action {
    readonly type = RESTART;
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
    | Restart;
