import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { featureKey } from './state';
import { reducer } from './reducer';
import { AuthenticationEffects } from './effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([AuthenticationEffects])
  ],
  providers: [AuthenticationEffects]
})
export class AuthenticationStateModule { }
