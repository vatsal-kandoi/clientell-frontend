import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../_services/token.service';
import { LoginService } from '../_services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  accessTokenFailed: boolean;
  constructor(private token: TokenService, private auth: LoginService) {
    this.accessTokenFailed = false;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>> {
    if (request.url.includes('/auth/login') || request.url.includes('/auth/signup')) {
      return next.handle(request).pipe(retry(3),catchError(this.handleError));      
    }
    let token = (this.accessTokenFailed) ? this.token.getRefeshToken() : this.token.getAccessToken();
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
    });
    return next.handle(request).pipe(retry(3),catchError(this.handleError));
  }

  private handleError(error: HttpResponse<any>) {
    if (error.status === 401) {
      this.accessTokenFailed = false;
      this.auth.logout();
    } else if (error.status === 402) {
      this.accessTokenFailed = true;
    } else if (error.status === 403) {
      this.accessTokenFailed = false;
      this.token.setTokens(error.body.access_token, error.body.refresh_token);
    } else if (error.status === 500 || error.status === 404) {
      return throwError('Something bad happened. Please try again later.');
    }
  };
}
