import { Component, OnInit, Input } from '@angular/core';

import { Experiment } from '../../model/experiment';
import { Agent } from '../../../agent/model/agent';

@Component({
  selector: 'app-experiment-detail',
  templateUrl: './experiment-detail.component.html',
  styleUrls: ['./experiment-detail.component.css']
})
export class ExperimentDetailComponent implements OnInit {

    @Input() experiment: Experiment;
    @Input() agents: Agent[];

    constructor() { }

    ngOnInit() {
        console.log('agents', this.agents);
    }

}
