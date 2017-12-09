import { Action } from '@ngrx/store';

import * as TesterModel from '../model/tester';

import * as fromTester from '../actions/tester-action';

import { Experiment } from '../../experiment/model/experiment';
import { isListLikeIterable } from '@angular/core/src/change_detection/change_detection_util';

export enum TestStep {
    none = 1,
    start,
    instruction,
    scenario,
    chat,
    survey,
    end
}

export enum ChatStep {
    before_trigger = 1,
    after_trigger,
    end,
}

export interface TesterState {
    tester: TesterModel.Tester;
    testPhase: TestStep;
    chatPhase: ChatStep;

    experiment: Experiment;

    isSpeak: boolean;
    isListen: boolean;

    action: string;

    loading: boolean;
    error: string;
}

const initialState: TesterState = {
    tester: null,
    testPhase: TestStep.none,
    chatPhase: ChatStep.before_trigger,

    experiment: null,

    isSpeak: false,
    isListen: false,

    action: '',


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

        case fromTester.NEXT:
        case fromTester.START:
            return {...state, testPhase: stepReducer(state.testPhase, action)};

        case fromTester.START_SUCCESS:
            const res = action.payload;
            return {...state, experiment: res};
        case fromTester.START_FAIL:
            return {...state, error: action.payload};


        case fromTester.SPEAK:
            return {...state};
        case fromTester.SPEAK_STOP:
            return {...state, isSpeak: false, action: '', chatPhase: ChatStep.after_trigger};
        case fromTester.LISTEN:
            return {...state, isListen: false };
        case fromTester.LISTEN_STOP:
            return {...state, isListen: true };
        case fromTester.LISTEN_SUCCESS:
            return {...state, action: action.payload, isSpeak: true};
        case fromTester.LISTEN_FAIL:
            return {...state, error: action.payload };

        case fromTester.END_CHAT:
            return {...state, isListen: false, isSpeak: false, testPhase: stepReducer(state.testPhase, action), chatPhase: ChatStep.end};

        case fromTester.END_TEST:
            return {...initialState};
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
        case fromTester.START:
            return TestStep.start;
        case fromTester.END_CHAT:
            return TestStep.survey;
        default:
            return state;
    }
}
