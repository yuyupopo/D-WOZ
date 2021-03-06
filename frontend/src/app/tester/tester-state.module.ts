import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


// Reducers
import { TesterReducer } from './reducers/reducer';

// Effects
import { TesterEffects } from './effects/tester-effect';

// Service
import { TestService } from './service/test.service';
import { SpeechService } from './service/speech.service';

// Module
import { TesterModule } from './components/tester.module';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    StoreModule.forFeature('tester', TesterReducer),
    EffectsModule.forFeature([
      TesterEffects
    ]),
    TesterModule,
  ],
  declarations: [
  ],
  exports: [
    StoreModule,
    EffectsModule,
  ],
  providers: [
      TestService,
      SpeechService
]
})
export class TesterStateModule { }
