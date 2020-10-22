import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { URL_PATHS } from './shared/models/constants/urlPathConstants';

const routes: Routes = [
  { path: '', redirectTo: URL_PATHS.authentication, pathMatch: 'full' },
  { path: URL_PATHS.authentication, loadChildren: () =>
    import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: URL_PATHS.home, loadChildren: () =>
    import('./main/main.module').then(m => m.MainModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
