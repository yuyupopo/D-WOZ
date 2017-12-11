import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Tester } from '../../model/tester';
import { Agent } from '../../../agent/model/agent';

import { TestStep } from '../../reducers/tester-reducer';

import * as fromTester from '../../reducers/reducer';
import * as TesterAction from '../../actions/tester-action';
import * as RouterAction from '../../../shared/route/route-action';

import { TestService } from '../../service/test.service';
import { SpeechService } from '../../service/speech.service';

import { Experiment } from '../../../experiment/model/experiment';

import { TdLoadingService } from '@covalent/core';

@Component({
  selector: 'app-tester-detail',
  templateUrl: './tester-detail.component.html',
  styleUrls: ['./tester-detail.component.css']
})
export class TesterDetailComponent implements OnInit, OnDestroy {

    testStep = TestStep;

    step$: Observable<TestStep>;

    experiment$: Observable<Experiment>;

    action: string;

    isListen$: Observable<boolean>;
    isSpeak$: Observable<boolean>;

    speechData: string;

    constructor(
        private _store: Store<fromTester.State>,
        private _speechService: SpeechService,
        private _loadingService: TdLoadingService) {
            this.speechData = '';
    }

    ngOnInit() {
        this.step$ = this._store.select(fromTester.getStep);
        this.experiment$ = this._store.select(fromTester.getTestExperiment);
        this.isListen$ = this._store.select(fromTester.isListen);
        this.isSpeak$ = this._store.select(fromTester.isSpeak);

        this._store.dispatch(new TesterAction.Start());

        if ('speechSynthesis' in window) {
            console.log('your browser support speech synthesis');
        } else {
            // error action
        }


        this.isListen$.subscribe(listen => {
            if (listen) {
                this._loadingService.register();
            } else {
                this._loadingService.resolve();
            }
        });
    }

    nextStep() {
        this._store.dispatch(new TesterAction.Next());
    }

    endChat() {
        this._store.dispatch(new TesterAction.EndChat());
    }

    endTest() {
        this._store.dispatch(new TesterAction.EndTest());
    }

    ngOnDestroy() {
        this._speechService.DestroySpeechObject();
    }



}
