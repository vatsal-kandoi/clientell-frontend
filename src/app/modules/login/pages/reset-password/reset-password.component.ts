import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../../_services/login.service';
import { ActivatedRoute } from '@angular/router';

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
  token: string;
  constructor(private auth: LoginService, private route: ActivatedRoute) {
    this.password = new FormControl('');
    this.password2 = new FormControl('');
    this.token = this.route.snapshot.queryParamMap.get('token');
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
    this.auth.resetPassword(this.token,this.password.value)
  }

}
