import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';



@NgModule({
  declarations: [LoaderComponent, NavbarComponent, SidenavComponent],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent, NavbarComponent, SidenavComponent]
})
export class SharedModule { }
