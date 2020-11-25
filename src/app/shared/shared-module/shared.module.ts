import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ModalComponent } from './modal/modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [LoaderComponent, NavbarComponent, SidenavComponent, ModalComponent, AlertComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [LoaderComponent, NavbarComponent, SidenavComponent, ModalComponent, AlertComponent]
})
export class SharedModule { }
