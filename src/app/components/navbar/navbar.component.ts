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

  /**
   * Directs a user to a user list page where the user will be able to see a list of all users.
   */
  public userList() {
    this.router.navigate(['home/user-list']);
  }

  /**
   * Determines if the user that has logged in ia an admin user.
   * @returns Returns true is the user logged in is an admin else false
   */
  public IsAdminUser(): boolean {
    return this.authService.isLoggedInAsAdmin();
  }

  /**
   * Directs a user to the home page.
   */
  public home() {
    this.router.navigate(['home']);
  }
}
