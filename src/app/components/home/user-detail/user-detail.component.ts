import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/interfaces/user.details';
import { UserInforService } from 'src/app/services/user.info.service';
import { COMMON } from '../../../common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  public user: UserDetails;

  constructor(private userDetail: UserInforService) {
    this.user = userDetail.getUserDetail();
  }

  ngOnInit(): void {
    console.log('user type', this.user.type);
    console.log('user name', this.user.userName);
  }
}
