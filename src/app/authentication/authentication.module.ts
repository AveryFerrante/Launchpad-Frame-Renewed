import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { EntryComponent } from './entry/entry.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationStateModule } from '../root-store/authentication';




@NgModule({
  declarations: [EntryComponent, CreateAccountComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AuthenticationRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AuthenticationStateModule
  ]
})
export class AuthenticationModule { }
