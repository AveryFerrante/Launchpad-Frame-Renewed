import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { EntryComponent } from './entry/entry.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [EntryComponent, CreateAccountComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class AuthenticationModule { }
