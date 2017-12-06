import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Experiment, ExperimentResult } from '../../model/experiment';

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

    constructor(private _store: Store<fromExperiment.State>) {
        this.experiments$ = _store.select(fromExperiment.getExperimentList);
        _store.select(fromExperiment.getSelectedExperiment).subscribe(experiment => {
            this.selectedExperiment = experiment;
        });
        this.experiments$.subscribe(v => console.log(v));
    }

    ngOnInit() {
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

}
