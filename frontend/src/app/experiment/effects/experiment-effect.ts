import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/of';

import { Http } from '@angular/http';

import { Store } from '@ngrx/store';

import * as ExperimentModel from '../model/experiment';
import * as ExperimentAction from '../actions/experiment-action';
import * as fromExperiment from '../reducers/reducer';

import { ExperimentService } from '../service/experiment.service';

@Injectable()
export class ExperimentEffects {

    @Effect()
    loadExperiment$: Observable<Action> = this.action$.ofType<ExperimentAction.Load>(ExperimentAction.LOAD)
        .map(action => action.payload).mergeMap(query =>
            this._http.get('/api/experiment').toPromise().then((res) => {
                return new ExperimentAction.LoadComplete(res.json());
            }));

    @Effect()
    selectExperiment$: Observable<Action> = this.action$.ofType<ExperimentAction.Select>(ExperimentAction.SELECT)
        .map(action => action.payload).mergeMap(query =>
            this._http.get(`/api/experiment/${query.id}`).toPromise().then(res => {
                console.log(res.json());
                return new ExperimentAction.LoadAgentComplete(res.json().agents);
            }));

    @Effect()
    createTestExperiment$: Observable<Action> = this.action$.ofType<ExperimentAction.CreateTest>(ExperimentAction.CREATE_TEST)
        .withLatestFrom(this._store).mergeMap(([action, state]) =>
            this._http.get(`/api/experiment/${action.payload}/test`).toPromise().then(res => {
                console.log(state);
                const id = (state as any).experiment.experiment.selectedExperiment.id;
                this._experimentSerivce.startSupervision(id);
                return new ExperimentAction.CreateTestComplete(res.json().link);
            }));

    @Effect({dispatch: false})
    discipline$: Observable<Action> = this.action$.ofType<ExperimentAction.TestDiscipline>(ExperimentAction.TEST_DISCIPLINE)
        .map(action => action.payload).mergeMap(query => {
            this._experimentSerivce.sendDiscipline(query);
            return Observable.of(null);
        });

    @Effect({dispatch: false})
        interrupt$: Observable<Action> = this.action$.ofType<ExperimentAction.TestInterrupt>(ExperimentAction.TEST_INTERRUPT)
            .map(action => action.payload).mergeMap(query => {
                this._experimentSerivce.interupt(query);
                return Observable.of(null);
            });

    constructor(
        private action$: Actions,
        private _http: Http,
        private _experimentSerivce: ExperimentService,
        private _store: Store<fromExperiment.State> ) {}
}
