import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

// Reducers
import { UserReducer } from './reducers/reducer';

// Effects
import { UserEffects } from './effects/user-effect';

// Service


// Module
import { UserModule } from './components/user.module';

@NgModule({
    imports: [
      CommonModule,
      HttpModule,
      StoreModule.forFeature('user', UserReducer),
      EffectsModule.forFeature([
        UserEffects
      ]),
      StoreRouterConnectingModule,
      UserModule,
    ],
    declarations: [
    ],
    exports: [
      StoreModule,
      EffectsModule,
    ],
    providers: [
    ]
  })
  export class UserStateModule { }
