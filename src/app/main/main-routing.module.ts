import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { MainGuard } from './router-guards/main.guard';

const routes: Routes = [
  { path: '', component: EntryComponent, canActivate: [MainGuard] }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [MainGuard],
  exports: [RouterModule]
})
export class MainRoutingModule { }
