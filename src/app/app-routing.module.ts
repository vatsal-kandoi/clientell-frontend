import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  AuthGuardService as AuthGuard } from './modules/login/_services/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import(`./modules/login/login.module`).then(m => m.LoginModule)
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
