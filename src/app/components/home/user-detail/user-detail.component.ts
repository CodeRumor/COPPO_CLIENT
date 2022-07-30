import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/interfaces/user.details';
import { COMMON } from '../../../common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  public user: UserDetails;

  constructor() {
    this.user = JSON.parse(localStorage.getItem(COMMON.CURRENT_USER)!);
  }

  ngOnInit(): void {
    console.log('user type', this.user.type);
    console.log('user name', this.user.userName);
  }
}
