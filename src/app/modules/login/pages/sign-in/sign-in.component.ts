import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../../_services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  error: string;
  fetchedResponse: boolean;
  constructor(private loginService: LoginService) {
    this.fetchedResponse = true;
    this.signinForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loginService.error.subscribe((val) => {
      if (val != '') {
        this.error = val;
      }
    });
    this.loginService.completedAuthRequest.subscribe((val) => {
      if (val) {
        this.fetchedResponse = true;
      }
    })
  }
  login() {
    this.fetchedResponse = false;
    this.loginService.login(this.signinForm.get('email').value,this.signinForm.get('password').value);
  }
}
