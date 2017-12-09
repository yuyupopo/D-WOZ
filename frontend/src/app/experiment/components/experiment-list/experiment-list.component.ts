import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Experiment, ExperimentResult } from '../../model/experiment';
import { Agent } from '../../../agent/model/agent';

import * as fromExperiment from '../../reducers/reducer';
import * as ExperimentAction from '../../actions/experiment-action';
import * as RouterAction from '../../../shared/route/route-action';

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css']
})
export class ExperimentListComponent implements OnInit {

    experiments$: Observable<Experiment[]>;
    selectedExperiment: Experiment;
    selectedExperimentAgents$: Observable<Agent[]>;

    constructor(private _store: Store<fromExperiment.State>) {
        this.experiments$ = _store.select(fromExperiment.getExperimentList);
        _store.select(fromExperiment.getSelectedExperiment).subscribe(experiment => {
            this.selectedExperiment = experiment;
        });
        this.selectedExperimentAgents$ = this._store.select(fromExperiment.getSelectedExperimentAgents);

        _store.select(fromExperiment.getExperimentState).subscribe(v => {
            console.log('state change', v);
        });
    }

    ngOnInit() {
        this._store.dispatch(new ExperimentAction.Clear());
        this._store.dispatch(new ExperimentAction.Load());
    }

    public selectExperiment(agent: Experiment): void {
        this._store.dispatch(new ExperimentAction.Select(agent));
    }

    public isSelected(agent: Experiment): boolean {
        if (this.selectedExperiment) {
            return (this.selectedExperiment.id === agent.id);
        } else {
            return false;
        }
    }

    public createExperiment(): void {
        this._store.dispatch(new RouterAction.GoByUrl('experiments/create'));
    }

    public editExperiment(agent: Experiment): void {
        this._store.dispatch(new RouterAction.GoByUrl(`experiments/${agent.id}/edit`));
    }

    public testExperiment(agent: Experiment): void {
        this._store.dispatch(new RouterAction.GoByUrl(`experiments/${agent.id}/test`));
    }

    public analyzeExperiment(agent: Experiment): void {
        this._store.dispatch(new RouterAction.GoByUrl(`experiments/${agent.id}/analysis`));
    }

}
