import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './route/app-routing.module';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-in/sign-up/sign-up.component';
import { AgentListComponent } from './agent/agent-list/agent-list.component';
import { AgentDetailComponent } from './agent/agent-detail/agent-detail.component';
import { AgentEditComponent } from './agent/agent-edit/agent-edit.component';
import { AgentCreateComponent } from './agent/agent-create/agent-create.component';

import { SpeechService } from './service/speech.service';
import { AgentService } from './service/agent.service';
import { LandingComponent } from './landing/landing.component';

// service
import { AuthenticationService } from './service/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    AgentListComponent,
    AgentDetailComponent,
    AgentEditComponent,
    AgentCreateComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    SpeechService,
    AgentService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
