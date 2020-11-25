import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { AuthenticationGuard } from './router-guards/authentication.guard';

const routes: Routes = [
  { path: '', component: EntryComponent, canActivate: [AuthenticationGuard] }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [AuthenticationGuard],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
