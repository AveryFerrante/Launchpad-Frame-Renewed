import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { EntryComponent } from './entry/entry.component';



@NgModule({
  declarations: [EntryComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
