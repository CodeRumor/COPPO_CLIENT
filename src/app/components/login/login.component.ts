import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.error = '';
  }

  ngOnInit(): void {
    this._createLoginForm();
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
  private _createLoginForm() {
    this.form = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
}
