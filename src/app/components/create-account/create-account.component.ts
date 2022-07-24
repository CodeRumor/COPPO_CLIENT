import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserType } from 'src/app/interfaces/user.type';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
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
      UserType: ['', Validators.required],
    });
  }
}
