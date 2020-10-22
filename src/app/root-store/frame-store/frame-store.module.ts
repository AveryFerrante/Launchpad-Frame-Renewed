import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { stateKey } from './state';
import { reducer } from './reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(stateKey, reducer),
    EffectsModule.forFeature([])
  ]
})
export class FrameStoreModule { }
