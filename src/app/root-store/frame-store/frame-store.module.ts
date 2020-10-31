import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { stateKey } from './state';
import { reducer } from './reducer';
import { FrameStoreEffects } from './effects';
import { FrameTranslator } from 'src/app/shared/models/translators/frameTranslator';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(stateKey, reducer),
    EffectsModule.forFeature([FrameStoreEffects])
  ],
  providers: [FrameTranslator]
})
export class FrameStoreModule { }
