import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../../_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: FormControl;
  fetchedResponse: boolean;
  error: string;
  constructor(private auth: LoginService, private router: Router) {
    this.email = new FormControl('');
    this.fetchedResponse = true;
  }

  send() {
    if (this.email.value == undefined || this.email.value == '') return;
    this.auth.forgotPassword(this.email.value);
  }

  ngOnInit(): void {
    this.auth.error.subscribe((val) => {
      if (val != '') {
        this.error = val;
      }
    });
    this.auth.completedAuthRequest.subscribe((val) => {
      if (val) {
        this.fetchedResponse = true;
      }
    })
  }
  sendMail() {

  }
}
