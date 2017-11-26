import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './route/app-routing.module';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-in/sign-up/sign-up.component';

import { SpeechService } from './service/speech.service';

import { LandingComponent } from './landing/landing.component';

import { AgentModule } from './agent/agent.module';

// service
import { AuthenticationService } from './service/authentication.service';

// directive
import { ClickOutsideDirective } from './directive/click-outside.directive';
import { StopClickPropagationDirective } from './directive/stop-click-propagation.directive';
import { StopHoverPropagationDirective } from './directive/stop-hover-propagation.directive';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    LandingComponent,

    ClickOutsideDirective,
    StopClickPropagationDirective,
    StopHoverPropagationDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AgentModule
  ],
  providers: [
    SpeechService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
