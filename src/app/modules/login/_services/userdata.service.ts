import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  name: string;
  email: string;

  constructor() {
    this.name = '';
    this.email = '';
  }

  setData(name, email) {
    this.name = name;
    this.email = email;
  }
}
