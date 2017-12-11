import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/toPromise';
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';

import { Http } from '@angular/http';

import { Store } from '@ngrx/store';

import * as TesterModel from '../model/tester';
import * as TesterAction from '../actions/tester-action';
import * as fromRouter from '../../shared/route/route-action';
import * as fromTester from '../reducers/reducer';

import { TestStep, ChatStep } from '../reducers/tester-reducer';

import { TestService } from '../service/test.service';
import { SpeechService } from '../service/speech.service';

@Injectable()
export class TesterEffects {

    @Effect()
    load$: Observable<Action> = this.action$.ofType<TesterAction.Load>(TesterAction.LOAD)
    .map(action => action.payload).mergeMap(query =>
        this._http.get(`/api/test/${query}`).mergeMap((res) => {
            console.log(res.json());
            return Observable.of(new TesterAction.LoadComplete(res.json()));
        }).catch(err => {
            console.log(err);
            return Observable.of(new TesterAction.LoadError(err));
        }));

    @Effect()
    loadComplete$: Observable<Action> = this.action$.ofType<TesterAction.LoadComplete>(TesterAction.LOAD_COMPLETE)
        .map(action => action.payload).mergeMap(query => {
            const id = query.id;
            return Observable.of(new fromRouter.GoByUrl(`/testers/${id}`));
        });

    @Effect({dispatch: false})
    start$: Observable<Action> = this.action$.ofType<TesterAction.Start>(TesterAction.START)
        .withLatestFrom(this._store).map(([action, state]) => state.tester)
        .map((tester) => {
            this._testService.startExperiment(tester.tester.experiment);
            return null;
        });

    @Effect({dispatch: false})
    listenStop$: Observable<Action> = this.action$.ofType<TesterAction.ListenStop>(TesterAction.LISTEN_STOP)
        .withLatestFrom(this._store).mergeMap(([action, state]) => {
            if (state.tester.chatPhase === ChatStep.before_trigger) {
                this._testService.sendTrigger(action.payload);
            } else {
                this._testService.sendBehavior(action.payload);
            }

            return Observable.of(null);
        });

    @Effect()
    listenSuccess$: Observable<Action> = this.action$.ofType<TesterAction.ListenSuccess>(TesterAction.LISTEN_SUCCESS)
        .map(action => action.payload).mergeMap(query => {
            this._speechService.talk(query);
            return Observable.of(new TesterAction.Speak());
        });

    @Effect()
    speakStop$: Observable<Action> = this.action$.ofType<TesterAction.SpeakStop>(TesterAction.SPEAK_STOP)
        .mergeMap(query => Observable.of(new TesterAction.Listen()));

    @Effect()
    next$: Observable<Action> = this.action$.ofType<TesterAction.Next>(TesterAction.NEXT)
        .withLatestFrom(this._store).filter(([action, state]) => state.tester.testPhase === TestStep.chat)
        .mergeMap(([action, state]) => Observable.of(new TesterAction.Listen()));

    @Effect({dispatch: false})
    listen$: Observable<Action> = this.action$.ofType<TesterAction.Listen>(TesterAction.LISTEN)
        .map(action => {
            this._speechService.activateSpeech();
            return null;
        });

    @Effect({dispatch: false})
    endChat$: Observable<Action> = this.action$.ofType<TesterAction.EndChat>(TesterAction.END_CHAT)
        .map(action => {
            this._speechService.DestroySpeechObject();
            return null;
        });

    @Effect({dispatch: false})
    endTest$: Observable<Action> = this.action$.ofType<TesterAction.EndTest>(TesterAction.END_TEST)
        .map(action => {
            this._store.dispatch(new fromRouter.GoByUrl('/testers'));
            return null;
        });

  constructor(
    private action$: Actions,
    private _store: Store<fromTester.State>,
    private _http: Http,
    private _testService: TestService,
    private _speechService: SpeechService) {}
}
