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

import { Http } from '@angular/http';

import * as ExperimentModel from '../model/experiment';
import * as fromExperiment from '../actions/experiment-action';


@Injectable()
export class ExperimentEffects {

    @Effect()
    loadExperiment$: Observable<Action> = this.action$.ofType<fromExperiment.Load>(fromExperiment.LOAD)
        .map(action => action.payload).mergeMap(query =>
            this._http.get('/api/experiment').toPromise().then((res) => {
                return new fromExperiment.LoadComplete(res.json());
            }));

    @Effect()
    selectExperiment$: Observable<Action> = this.action$.ofType<fromExperiment.Select>(fromExperiment.SELECT)
        .map(action => action.payload).mergeMap(query =>
            this._http.get(`/api/experiment/${query.id}`).toPromise().then(res => {
                console.log(res.json());
                return new fromExperiment.LoadAgentComplete(res.json().agents);
            }));

    @Effect()
    createTestExperiment$: Observable<Action> = this.action$.ofType<fromExperiment.CreateTest>(fromExperiment.CREATE_TEST)
        .map(action => action.payload).mergeMap(query =>
            this._http.get(`/api/experiment/${query}/test`).toPromise().then(res =>
            new fromExperiment.CreateTestComplete(res.json().link)));

    constructor(
        private action$: Actions,
        private _http: Http ) {}
}
