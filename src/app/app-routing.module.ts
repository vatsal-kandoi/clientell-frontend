import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  AuthGuardService as AuthGuard } from './modules/login/_guards/auth.guard';
import {LoggedinGuardService} from './modules/login/_guards/loggedin.guard';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  {
    path: 'auth',
    loadChildren: () => import(`./modules/login/login.module`).then(m => m.LoginModule),
    canActivate: [LoggedinGuardService]
  },
  {
    path: 'dashboard',
    loadChildren: () => import(`./modules/dashboard/dashboard.module`).then(m => m.DashboardModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
