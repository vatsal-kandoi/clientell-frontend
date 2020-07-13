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
  constructor(private auth: LoginService) {
    this.password = new FormControl('');
    this.password2 = new FormControl('');
    this.fetchedResponse = true;
  }

  ngOnInit(): void {
  }
  reset() {

  }

}
