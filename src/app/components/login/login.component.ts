import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form!: FormGroup;
  error: string = "";

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.error = "";
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  /**
   * Create the login form used to log the user into the application using the user's name and password.
   */
  createLoginForm(){
    this.form = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  /**
   * Submit your password and username to the server side allowing you to authenticate to the application.
   */
  submit(){
    this.authService.login(this.form.value.Username, this.form.value.Password).subscribe({
      next : () => {
        if(this.authService.getAuth()?.token){
          this.error = "";
        }else {
          this.error = "wrong password and user name";
        }
      },
      error : error => {
        console.log(error);
      }
    });
  }
}
