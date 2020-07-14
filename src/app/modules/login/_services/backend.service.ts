import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/_services/url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthBackendService {

    constructor(private url: UrlService, private http: HttpClient) {
    }
    signup(name, email, password) {
        return this.http.post(this.url.signupUrl, {name: name, email: email, password: password})
    }

    login(email, password) {
        return this.http.post(this.url.loginUrl, {email, password})
    }

    refresh() {
        return this.http.post(this.url.refreshTokenUrl, {}, {withCredentials: true});
    }

    logout() {
        return this.http.post(this.url.logoutUrl, {}).toPromise();
    }

    forgotPassword() {

    }

    resetPassword() {
        
    }
}