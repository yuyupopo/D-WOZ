import { Action } from '@ngrx/store';

import * as TesterModel from '../model/tester';

import * as fromTester from '../actions/tester-action';

export enum TestStep {
    none = 1,
    start,
    instruction,
    scenario,
    chat,
    survey,
    end
}

export interface TesterState {
    tester: TesterModel.Tester;
    testPhase: TestStep;
    loading: boolean;
    error: string;
}

const initialState: TesterState = {
    tester: null,
    testPhase: TestStep.none,
    loading: false,
    error: ''
};

export function TesterReducer(state: TesterState = initialState, action: fromTester.Actions): TesterState {
    switch (action.type) {
        case fromTester.LOAD:
            return {...state, loading: true};
        case fromTester.LOAD_COMPLETE:
            return {...state, tester: action.payload, loading: false};
        case fromTester.LOAD_ERROR:
            return {...state, error: action.payload};
        default:
            return {...state};
    }
}

function stepReducer(state: TestStep, action: fromTester.Actions): TestStep {
    switch (action.type) {
        case fromTester.NEXT:
            switch (state) {
                case TestStep.none:
                    return TestStep.start;
                case TestStep.start:
                    return TestStep.instruction;
                case TestStep.instruction:
                    return TestStep.scenario;
                case TestStep.scenario:
                    return TestStep.chat;
                case TestStep.chat:
                    return TestStep.survey;
                case TestStep.survey:
                    return TestStep.end;
                default:
                    return TestStep.none;
            }
        case fromTester.RESTART:
            return TestStep.none;
        default:
            return state;
    }
}
