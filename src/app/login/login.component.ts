import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {

    this.form = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }

  submit(){
    this.authService.login(this.form.value.Username, this.form.value.Password).subscribe({
      next : res => {
        alert(this.authService.getAuth()!.token);
      },
      error : error => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {
  }

}
