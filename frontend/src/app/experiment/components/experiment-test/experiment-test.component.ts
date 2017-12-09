import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Experiment, ExperimentResult } from '../../model/experiment';
import { Agent } from '../../../agent/model/agent';

import * as fromExperiment from '../../reducers/reducer';
import * as ExperimentAction from '../../actions/experiment-action';
import * as RouterAction from '../../../shared/route/route-action';

import { TdLoadingService } from '@covalent/core';

import { ExperimentService } from '../../service/experiment.service';

@Component({
  selector: 'app-experiment-test',
  templateUrl: './experiment-test.component.html',
  styleUrls: ['./experiment-test.component.css']
})
export class ExperimentTestComponent implements OnInit {

    testLink: string;
    isTesting: boolean;

    isException$: Observable<boolean>;
    currAction = '';
    currBehavior = '';
    currHypothesisList: string[] = [];

    disciplineText = '';

    constructor(
        private _store: Store<fromExperiment.State>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _location: Location,
        private _loadingService: TdLoadingService,
        private _experimentService: ExperimentService) { }

    ngOnInit() {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this._loadingService.register();
            this._store.dispatch(new ExperimentAction.CreateTest(+params.get('id')));
        });
        this._store.select(fromExperiment.getTestLink).subscribe(link => {
            if (link) {
                // this._loadingService.resolve();
                this.testLink = link;
            }
        });
        this._store.select(fromExperiment.isTesting).subscribe(isTesting => {
            this.isTesting = isTesting;
            if (isTesting) {
                this._loadingService.resolve();
            }
        });
        this.isException$ = this._store.select(fromExperiment.isException);
        this._store.select(fromExperiment.getAction).subscribe(action => {
            this.currAction = action;
        });
        this._store.select(fromExperiment.getBehavior).subscribe(behavior => {
            this.currBehavior = behavior;
        });
        this._store.select(fromExperiment.getHypothesisList).subscribe(hypothesisList => {
            this.currHypothesisList = hypothesisList;
        });
    }
    public discipline() {
        this._store.dispatch(new ExperimentAction.TestDiscipline(this.disciplineText));
    }
}
