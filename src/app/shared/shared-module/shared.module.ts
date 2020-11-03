import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [LoaderComponent, NavbarComponent],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent, NavbarComponent]
})
export class SharedModule { }
