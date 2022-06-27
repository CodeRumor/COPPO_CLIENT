import { Component, OnInit } from '@angular/core';
import { COMMON } from '../../common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: any;

  constructor() {}

  ngOnInit(): void {
    this.user = localStorage.getItem(COMMON.CURRENT_USER);
  }
}
