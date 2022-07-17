import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserType } from 'src/app/interfaces/user.type';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  userTypes: UserType[] = [
    { value: 'Admin', viewValue: 'Admin' },
    { value: 'User', viewValue: 'User' },
  ];

  constructor(private formBuilder: FormBuilder) {}
  createAccountForm!: FormGroup;
  error: string = '';

  ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      Email: ['', Validators.required],
    });
  }
}
