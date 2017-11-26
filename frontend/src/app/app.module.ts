import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './route/app-routing.module';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-in/sign-up/sign-up.component';

import { SpeechService } from './service/speech.service';

import { LandingComponent } from './landing/landing.component';

// agent
import { AgentListComponent } from './agent/agent-list/agent-list.component';
import { AgentDetailComponent } from './agent/agent-detail/agent-detail.component';
import { AgentEditComponent } from './agent/agent-edit/agent-edit.component';
import { AgentCreateComponent } from './agent/agent-create/agent-create.component';

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

import { AppStateModule } from './state/app-state.module';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    LandingComponent,

    // agent
    AgentCreateComponent,
    AgentDetailComponent,
    AgentListComponent,
    AgentEditComponent,

    ClickOutsideDirective,
    StopClickPropagationDirective,
    StopHoverPropagationDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreRouterConnectingModule,
    AppStateModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [
    SpeechService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
