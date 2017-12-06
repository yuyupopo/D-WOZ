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

import { Http } from '@angular/http';

import * as ExperimentModel from '../model/experiment';
import * as fromExperiment from '../actions/experiment-action';


@Injectable()
export class ExperimentEffects {

    @Effect()
    load$: Observable<Action> = this.action$.ofType<fromExperiment.Load>(fromExperiment.LOAD)
        .map(action => action.payload).mergeMap(query =>
            this._http.get('/api/experiment').toPromise().then((res) =>
                new fromExperiment.LoadComplete(res.json())));

    constructor(
        private action$: Actions,
        private _http: Http ) {}
}
