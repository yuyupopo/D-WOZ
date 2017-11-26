import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

// Reducers
import { reducers } from './reducers/reducer';

// Effects
import { AgentEffects } from './effects/agent-effect';

// service

import { AgentService } from './service/agent.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AgentEffects
    ]),
    StoreRouterConnectingModule,
  ],
  declarations: [],
  exports: [
    StoreModule,
    EffectsModule,
  ],
  providers: [
    AgentService
  ]
})
export class AppStateModule { }
