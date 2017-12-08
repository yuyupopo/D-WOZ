import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Experiment, ExperimentResult } from '../../model/experiment';
import { Agent } from '../../../agent/model/agent';

import * as fromExperiment from '../../reducers/reducer';
import * as ExperimentAction from '../../actions/experiment-action';
import * as RouterAction from '../../../shared/route/route-action';

import { TdLoadingService } from '@covalent/core';

@Component({
  selector: 'app-experiment-test',
  templateUrl: './experiment-test.component.html',
  styleUrls: ['./experiment-test.component.css']
})
export class ExperimentTestComponent implements OnInit {

    testLink: string;

    constructor(
        private _store: Store<fromExperiment.State>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _location: Location,
        private _loadingService: TdLoadingService) { }

    ngOnInit() {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this._loadingService.register();
            this._store.dispatch(new ExperimentAction.CreateTest(+params.get('id')));
        });
        this._store.select(fromExperiment.getTestLink).subscribe(link => {
            if (link) {
                this._loadingService.resolve();
                this.testLink = link;
            }
        });
    }
}
