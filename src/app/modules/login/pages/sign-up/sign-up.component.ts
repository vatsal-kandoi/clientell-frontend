import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {LoginService} from '../../_services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  error: string;
  
  constructor(private loginService: LoginService) {
    this.signupForm = new FormGroup({
      name: new FormControl(''),
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
  }

  signup() {
    this.loginService.signup(this.signupForm.get('name').value,this.signupForm.get('email').value,this.signupForm.get('password').value);
  }
}
