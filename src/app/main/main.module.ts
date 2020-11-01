import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { MainRoutingModule } from './main-routing.module';
import { FrameTranslator } from '../shared/models/translators/frameTranslator';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [EntryComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgxDropzoneModule
  ],
  providers: [FrameTranslator]
})
export class MainModule { }
