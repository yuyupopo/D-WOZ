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

import { Http } from '@angular/http';

import * as TesterModel from '../model/tester';
import * as fromTester from '../actions/tester-action';
import * as fromRouter from '../../shared/route/route-action';


@Injectable()
export class TesterEffects {

    @Effect()
    load$: Observable<Action> = this.action$.ofType<fromTester.Load>(fromTester.LOAD)
    .map(action => action.payload).mergeMap(query =>
        this._http.get(`/api/test/${query}`).mergeMap((res) => {
            console.log(res.json());
            return Observable.of(new fromTester.LoadComplete(res.json()));
        }).catch(err => {
            console.log(err);
            return Observable.of(new fromTester.LoadError(err));
        }));

    @Effect()
    loadComplete$: Observable<Action> = this.action$.ofType<fromTester.LoadComplete>(fromTester.LOAD_COMPLETE)
        .map(action => action.payload).mergeMap(query => {
            const id = query.id;
            return Observable.of(new fromRouter.GoByUrl(`/testers/${id}`));
        });

  constructor(
    private action$: Actions,
    private _http: Http) {}
}
