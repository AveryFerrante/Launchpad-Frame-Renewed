import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { MainRoutingModule } from './main-routing.module';
import { FrameTranslator } from '../shared/models/translators/frameTranslator';



@NgModule({
  declarations: [EntryComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  providers: [FrameTranslator]
})
export class MainModule { }
