import { UserAuthorisationGuard } from 'src/app/guards/user.authorisation.guard';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserDetailComponent } from '../user-detail/user-detail.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
