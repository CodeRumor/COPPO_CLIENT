import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-navbar',
  templateUrl: './login-navbar.component.html',
  styleUrls: ['./login-navbar.component.css'],
})
export class LoginNavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public login() {
    this.router.navigate(['login']);
  }

  public createUser() {
    this.router.navigate(['create-account']);
  }
}
