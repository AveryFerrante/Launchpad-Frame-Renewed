import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { MainRoutingModule } from './main-routing.module';
import { FrameTranslator } from '../shared/models/translators/frameTranslator';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedModule } from '../shared/shared-module/shared.module';
import { FrameComponent } from './frame/frame.component';
import { CreateFrameComponent } from './create-frame/create-frame.component';
import { LiveViewComponent } from './live-view/live-view.component';



@NgModule({
  declarations: [EntryComponent, FrameComponent, CreateFrameComponent, LiveViewComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgxDropzoneModule,
    SharedModule
  ],
  providers: [FrameTranslator]
})
export class MainModule { }
