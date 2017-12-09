import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


// Reducers
import { reducer } from './reducers/reducer';

// Effects
import { ExperimentEffects } from './effects/experiment-effect';

// Service

// Module
import { ExperimentModule } from './components/experiment.module';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    StoreModule.forFeature('experiment', reducer),
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
