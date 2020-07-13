import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';


const routes: Routes = [
    {
        path: 'login',
        component: SignInComponent,
    },
    {
        path: 'signup',
        component: SignUpComponent,
    },
    {
        path: 'forgotpassword',
        component: ForgotPasswordComponent,
    },
    {
        path: 'resetpassword',
        component: ResetPasswordComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
