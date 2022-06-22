import { UserAuthorisationGuard } from 'src/app/guards/user.authorisation.guard';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserAuthorisationGuard],
    data: { breadcrum: 'home', title: 'home' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
