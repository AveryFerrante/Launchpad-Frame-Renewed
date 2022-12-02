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
import { JoinFrameComponent } from './join-frame/join-frame.component';
import { FrameSidenavComponent } from './frame-sidenav/frame-sidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageLazyLoadDirective } from './directives/image-lazy-load.directive';
import { ImageEditorComponent } from './image-editor/image-editor.component';



@NgModule({
  declarations: [
    EntryComponent,
    FrameComponent,
    CreateFrameComponent,
    LiveViewComponent,
    JoinFrameComponent,
    FrameSidenavComponent,
    ImageLazyLoadDirective,
    ImageEditorComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgxDropzoneModule,
    SharedModule,
    FontAwesomeModule
  ],
  providers: [FrameTranslator]
})
export class MainModule { }
