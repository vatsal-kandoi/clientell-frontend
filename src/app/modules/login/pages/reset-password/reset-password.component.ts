import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../../_services/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: FormControl;
  password2: FormControl;
  fetchedResponse: boolean;
  error: string;

  constructor(private auth: LoginService) {
    this.password = new FormControl('');
    this.password2 = new FormControl('');
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
    })  }
  reset() {

  }

}
