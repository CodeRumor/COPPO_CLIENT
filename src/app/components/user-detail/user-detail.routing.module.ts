import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserDetailComponent } from './user-detail.component';
import { UserAuthorisationGuard } from 'src/app/guards/user.authorisation.guard';

const routes: Routes = [
  {
    path: '',
    component: UserDetailComponent,
    canActivate: [UserAuthorisationGuard],
    data: { breadcrum: 'user-detail', title: 'user-detail' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDetailRoutingModule {}
