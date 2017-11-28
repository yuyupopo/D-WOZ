import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';

import { SpeechService } from './service/speech.service';

import { LandingComponent } from './landing/landing.component';

// service
import { AuthenticationService } from './service/authentication.service';

// directive
import { ClickOutsideDirective } from './directive/click-outside.directive';
import { StopClickPropagationDirective } from './directive/stop-click-propagation.directive';
import { StopHoverPropagationDirective } from './directive/stop-hover-propagation.directive';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store/src/store_module';
import { EffectsModule } from '@ngrx/effects/src/effects_module';

import { AgentStateModule } from './agent/agent-state.module';
import { UserStateModule } from './user/user-state.module';

import { reducers } from './reducer';

const routes: Routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' }, // for easy testing, temporary
    { path: 'landing', component: LandingComponent },
    { path: 'agents', loadChildren: './agent/agent-state.module.ts#AgentStateModule' },
    { path: '**', redirectTo: '/signin' }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,

    ClickOutsideDirective,
    StopClickPropagationDirective,
    StopHoverPropagationDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UserStateModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),

  ],
  providers: [  ],
  exports: [
      RouterModule,
      StoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
