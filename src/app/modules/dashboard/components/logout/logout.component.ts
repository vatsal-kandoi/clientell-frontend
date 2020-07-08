import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/login/_services/login.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: LoginService) { }

  ngOnInit(): void {
  }
  logout() {
    this.auth.logout();
  }
}
