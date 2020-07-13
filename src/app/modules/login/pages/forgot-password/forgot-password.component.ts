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
  constructor(private auth: LoginService) {
    this.email = new FormControl('');
    this.fetchedResponse = true;
  }

  ngOnInit(): void {
  }
  sendMail() {

  }
}
