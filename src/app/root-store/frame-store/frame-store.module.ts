import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { frameStateKey } from './state';
import { reducer } from './reducer';
import { FrameStoreEffects } from './effects';
import { FrameTranslator } from 'src/app/shared/models/translators/frameTranslator';
import { UserTranslator } from 'src/app/shared/models/translators/userTranslator';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(frameStateKey, reducer),
    EffectsModule.forFeature([FrameStoreEffects])
  ],
  providers: [FrameTranslator, UserTranslator]
})
export class FrameStoreModule { }
