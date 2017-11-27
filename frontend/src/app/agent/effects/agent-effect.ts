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

import * as AgentModel from '../model/agent';
import * as fromAgent from '../actions/agent-action';
import { AgentService } from '../service/agent.service';


@Injectable()
export class AgentEffects {
  @Effect()
  load$: Observable<Action> = this.action$
    .ofType<fromAgent.Load>(fromAgent.LOAD)
    .map(action => action.payload)
    .mergeMap(query => {
      return Observable.fromPromise(this._agentService.getAgentList())
        .map((agents: AgentModel.Agent[]) => new fromAgent.LoadComplete(agents))
        .catch(err => of(new fromAgent.LoadError(err)));
    });

  // @Effect()
  // create$: Observable<Action> = this.action$
  //   .ofType<fromAgent.Create>(fromAgent.CREATE)
  //   .map(action => action.payload)
  //   .mergeMap( query => {
  //     return
  //   });

  constructor(
    private action$: Actions,
    private _agentService: AgentService
  ) {}
}
