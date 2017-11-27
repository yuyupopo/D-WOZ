import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from '../sign-in/sign-in.component';
import { LandingComponent } from '../landing/landing.component';

import { AuthenticationService } from '../service/authentication.service';
import { AgentListComponent } from '../agent/components/agent-list/agent-list.component';
import { AgentCreateComponent } from '../agent/components/agent-create/agent-create.component';
import { AgentDetailComponent } from '../agent/components/agent-detail/agent-detail.component';
import { AgentEditComponent } from '../agent/components/agent-edit/agent-edit.component';

const routes = [
  { path: '', redirectTo: '/agents', pathMatch: 'full' }, // for easy testing, temporary
  { path: 'landing', component: LandingComponent },
  { path: 'sign_in',  component: SignInComponent },
  {
    path: 'agents',
    component: AgentListComponent,
    canActivate: [ AuthenticationService ],
  },
  {
    path: 'agents/:id',
    component: AgentDetailComponent,
    canActivate: [ AuthenticationService ],
  },
  {
    path: 'agents/:id/edit',
    component: AgentEditComponent,
    canActivate: [ AuthenticationService ],
  },
  {
    path: 'agents/create',
    component: AgentCreateComponent,
    canActivate: [ AuthenticationService ],
  },
  {
    path: '**',
    component: LandingComponent,
    canActivate: [ AuthenticationService ],
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


// /experiments : ExperimentListComponent
// => see experiment detail
// => create new experiment
// => see agents list

// /experiments/create : ExperimentCreateComponent
// /experiments/:id : ExperimentDetailComponent
// => can edit experiments
// /experiments/:id/analysis : ExperimentAnalysisComponent
// /experiments/:id/edit : ExperimentEditComponent
// /experiments/:id/test : ExperimentTestComponent
// => create new test instance with code

// tests

// /tests : TestListComponent
// /tests/:code : TestDetailComponent

// signin

// /signin : SigninComponent
// /signup : Signupcomponent
