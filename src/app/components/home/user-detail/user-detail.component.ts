import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/interfaces/user.details';
import { UserInforService } from 'src/app/services/user.info.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  public user: UserDetails = this.userDetail.getUserDetail();

  constructor(private userDetail: UserInforService) {}

  ngOnInit(): void {}
}
