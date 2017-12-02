import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

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
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgentStateModule } from './agent/agent-state.module';
import { UserStateModule } from './user/user-state.module';

import { reducers, CustomSerializer } from './shared/reducer';

import { RouterEffects } from './shared/route/route-effect';

import { NavbarComponent } from './shared/components/navbar/navbar.component';

const routes: Routes = [
    { path: '', redirectTo: 'agents', pathMatch: 'full' }, // for easy testing, temporary
    { path: 'landing', pathMatch: 'full', component: LandingComponent },
    { path: 'users', loadChildren: './user/user-state.module#UserStateModule'},
    { path: 'agents', loadChildren: './agent/agent-state.module#AgentStateModule' },
    { path: 'experiments', loadChildren: './experiment/experiment-state.module#ExperimentStateModule' },
    { path: 'testers', loadChildren: './tester/tester-state.module#TesterStateModule'},
    { path: '**', redirectTo: 'users/signin' }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,

    ClickOutsideDirective,
    StopClickPropagationDirective,
    StopHoverPropagationDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
        RouterEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25   }),
    StoreRouterConnectingModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    { provide: APP_BASE_HREF, useValue: '/'},
    SpeechService,
    ],
  exports: [
      StoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
