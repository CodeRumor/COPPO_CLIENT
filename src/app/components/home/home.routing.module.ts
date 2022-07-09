import { UserAuthorisationGuard } from 'src/app/guards/user.authorisation.guard';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { UserAdminAuthorisationGuard } from 'src/app/guards/user-admin.authorisation.guard';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserAuthorisationGuard],
    data: { breadcrum: 'home', title: 'home' },
    children: [
      {
        path: 'user-detail',
        component: UserDetailComponent,
        canActivate: [UserAuthorisationGuard],
      },
      {
        path: 'user-list',
        component: UserListComponent,
        canActivate: [UserAdminAuthorisationGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
