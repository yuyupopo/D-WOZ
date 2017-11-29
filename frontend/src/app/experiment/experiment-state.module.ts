import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


// Reducers
import { ExperimentReducer } from './reducers/reducer';

// Effects
import { ExperimentEffects } from './effects/experiment-effect';

// Service

// Module
import { ExperimentModule } from './components/experiment.module';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    StoreModule.forFeature('experiment', ExperimentReducer),
    EffectsModule.forFeature([
      ExperimentEffects
    ]),
    ExperimentModule,
  ],
  declarations: [
  ],
  exports: [
    StoreModule,
    EffectsModule,
  ],
  providers: [  ]
})
export class ExperimentStateModule { }
