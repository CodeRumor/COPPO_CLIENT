import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserAuthorisationGuard } from './guards/user.authorisation.guard';
import { UserSignInGuard } from './guards/user.signIn.guard';

const routes: Routes = [
  {
    path: 'landingpage',
    canActivate: [UserAuthorisationGuard],
    loadChildren: () =>
      import('../app/components/landing-page/landing-page.routing.module').then(
        (m) => m.LandingPageRoutingModule
      ),
  },
  {
    path: 'login',
    canActivate: [UserSignInGuard],
    loadChildren: () =>
      import('../app/components/login/login.routing.module').then(
        (m) => m.LoginRoutingModule
      ),
  },
  {
    path: '',
    canActivate: [UserSignInGuard],
    loadChildren: () =>
      import('../app/components/login/login.routing.module').then(
        (m) => m.LoginRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
