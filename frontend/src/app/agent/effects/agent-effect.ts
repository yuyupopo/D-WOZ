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
import { Http, Headers } from '@angular/http';

import * as AgentModel from '../model/agent';
import * as fromAgent from '../actions/agent-action';
import * as fromRouter from '../../shared/route/route-action';
import { AgentService } from '../service/agent.service';


@Injectable()
export class AgentEffects {
  @Effect()
  load$: Observable<Action> = this.action$.ofType<fromAgent.Load>(fromAgent.LOAD)
    .map(action => action.payload).mergeMap(query =>
        this._http.get('/api/agent').toPromise().then((res) =>
            new fromAgent.LoadComplete(res.json())));

    @Effect()
    loadAgent$: Observable<Action> = this.action$.ofType<fromAgent.LoadAgent>(fromAgent.LOAD_AGENT)
        .map(action => action.payload).mergeMap(query =>
            this._http.get(`/api/agent/${query}`).toPromise().then((res) => {
                console.log(res.json());
                return new fromAgent.LoadAgentComplete(res.json());
            }

            ));

  // @Effect()
  // create$: Observable<Action> = this.action$
  //   .ofType<fromAgent.Create>(fromAgent.CREATE)
  //   .map(action => action.payload)
  //   .mergeMap( query => {
  //     return
  //   });

  constructor(
    private action$: Actions,
    private _agentService: AgentService,
    private _http: Http
  ) {}
}
