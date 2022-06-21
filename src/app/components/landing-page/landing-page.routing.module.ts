import { UserAuthorisationGuard } from 'src/app/guards/user.authorisation.guard';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [UserAuthorisationGuard],
    data: { breadcrum: 'landing page', title: 'landing page' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
