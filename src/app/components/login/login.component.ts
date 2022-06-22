import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRightsService } from 'src/app/services/user.rights.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userRightsService: UserRightsService
  ) {
    this.error = '';
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  /**
   * Submit your password and username to the server side allowing you to authenticate to the application.
   */
  public submit() {
    this.authService
      .login(this.form.value.Username, this.form.value.Password)
      .subscribe({
        next: () => {
          if (this.authService.getAuth()?.token) {
            this.error = '';
            this.router.navigate(['home']);
          } else {
            this.error = 'wrong password and user name';
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * Create the login form used to log the user into the application using the user's name and password.
   */
  private createLoginForm() {
    this.form = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
}
