import { Component, OnInit } from '@angular/core';

import { IStepChangeEvent } from '@covalent/core';
import { StepState } from '@covalent/core';

@Component({
  selector: 'app-experiment-create',
  templateUrl: './experiment-create.component.html',
  styleUrls: ['./experiment-create.component.css']
})
export class ExperimentCreateComponent implements OnInit {

    activeDeactiveStep1Msg = 'No select/deselect detected yet';
    stateStep2: StepState = StepState.Required;
    stateStep3: StepState = StepState.Complete;
    disabled = false;

    constructor() { }

    ngOnInit() {
    }

    change(event: IStepChangeEvent): void {

    }

    toggleRequiredStep2(): void {
      this.stateStep2 = (this.stateStep2 === StepState.Required ? StepState.None : StepState.Required);
    }

    toggleCompleteStep3(): void {
      this.stateStep3 = (this.stateStep3 === StepState.Complete ? StepState.None : StepState.Complete);
    }

    activeStep1Event(): void {
      this.activeDeactiveStep1Msg = 'Active event emitted.';
    }

    deactiveStep1Event(): void {
      this.activeDeactiveStep1Msg = 'Deactive event emitted.';
    }

}
