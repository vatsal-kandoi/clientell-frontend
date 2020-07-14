import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './modules/login/_interceptors/token.interceptor';
import { AuthGuardService } from './modules/login/_guards/auth.guard';
import {LoggedinGuardService} from './modules/login/_guards/loggedin.guard';
import { TokenService } from './modules/login/_services/token.service';
import { StoreModule } from '@ngrx/store';
import { AccessToken } from './modules/login/redux/access-token.reducer';
import {UserData} from './modules/dashboard/shared/redux/projects.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ AccessToken, UserData })    
  ],
  providers: [
    AuthGuardService,
    LoggedinGuardService,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
