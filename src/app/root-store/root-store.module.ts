import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { reducer, clearStateOnSignOut } from './reducer';
import { RootEffects } from './effects';
import { authenticationPropertyKey } from './state';
import { FrameStoreModule } from './frame-store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({ [authenticationPropertyKey]: reducer }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    EffectsModule.forRoot([RootEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    FrameStoreModule
  ]
})
export class RootStoreModule { }
