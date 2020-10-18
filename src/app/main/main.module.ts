import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { MainRoutingModule } from './main-routing.module';



@NgModule({
  declarations: [EntryComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
