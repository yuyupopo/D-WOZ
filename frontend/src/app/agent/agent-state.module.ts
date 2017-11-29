import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


// Reducers
import { AgentReducer } from './reducers/reducer';

// Effects
import { AgentEffects } from './effects/agent-effect';

// Service
import { AgentService } from './service/agent.service';

// Module
import { AgentModule } from './components/agent.module';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    StoreModule.forFeature('agent', AgentReducer),
    EffectsModule.forFeature([
      AgentEffects
    ]),
    AgentModule,
  ],
  declarations: [
  ],
  exports: [
    StoreModule,
    EffectsModule,
  ],
  providers: [
    AgentService
  ]
})
export class AgentStateModule { }
