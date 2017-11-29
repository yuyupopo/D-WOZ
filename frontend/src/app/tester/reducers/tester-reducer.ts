import { Action } from '@ngrx/store';

import * as TesterModel from '../model/tester';

import * as fromTester from '../actions/tester-action';

export interface TesterState {
    testerList: TesterModel.Tester[];
    selectedTester: TesterModel.Tester;
    loading: boolean;
    error: string;
}

const initialState: TesterState = {
    testerList: [],
    selectedTester: null,
    loading: false,
    error: ''
};

export function TesterReducer(state: TesterState = initialState, action: fromTester.Actions) {
    switch (action.type) {
        case fromTester.SELECT:
            return {...state, selectedTester: action.payload};
        case fromTester.LOAD:
            return {...state, loading: true};
        case fromTester.LOAD_COMPLETE:
            return {...state, testerList: action.payload, loading: false};
        case fromTester.LOAD_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    }
}
