import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../../_services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: FormControl;
  fetchedResponse: boolean;
  error: string;
  constructor(private auth: LoginService) {
    this.email = new FormControl('');
    this.fetchedResponse = true;
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
