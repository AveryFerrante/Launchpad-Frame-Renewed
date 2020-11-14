import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [LoaderComponent, NavbarComponent, SidenavComponent, ModalComponent],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent, NavbarComponent, SidenavComponent, ModalComponent]
})
export class SharedModule { }
