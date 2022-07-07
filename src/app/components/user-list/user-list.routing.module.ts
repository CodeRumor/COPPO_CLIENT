import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserAuthorisationGuard } from 'src/app/guards/user.authorisation.guard';
import { UserListComponent } from './user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [UserAuthorisationGuard],
    data: { breadcrum: 'user-list', title: 'user-list' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserListRoutingModule {}
