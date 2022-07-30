import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserType } from 'src/app/interfaces/user.type';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  public userTypes: UserType[] = [
    { value: 'Admin', viewValue: 'Admin' },
    { value: 'User', viewValue: 'User' },
  ];

  public createAccountForm!: FormGroup;
  public error: string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      Email: ['', Validators.required],
      UserType: ['', Validators.required],
    });
  }
}
