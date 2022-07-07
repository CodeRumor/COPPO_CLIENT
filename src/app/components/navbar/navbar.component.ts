import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  user: any;

  ngOnInit(): void {}

  /**
   * logs the user out of the application and navigates the user to the login page.
   */
  public logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  /**
   * Directs a user to a user setting page where the user will be able to see there settings.
   */
  public setting() {
    this.router.navigate(['home/user-detail']);
  }

  public userList() {
    this.router.navigate(['home/user-list']);
  }
}
