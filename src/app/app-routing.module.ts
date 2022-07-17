import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthorisationGuard } from './guards/user.authorisation.guard';
import { UserLoginInGuard } from './guards/user.login.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [UserAuthorisationGuard],
    loadChildren: () =>
      import('./components/home/home.routing.module').then(
        (m) => m.HomeRoutingModule
      ),
  },
  {
    path: 'login',
    canActivate: [UserLoginInGuard],
    loadChildren: () =>
      import('../app/components/login/login.routing.module').then(
        (m) => m.LoginRoutingModule
      ),
  },
  {
    path: 'signin',
    canActivate: [UserLoginInGuard],
    loadChildren: () =>
      import('./components/signin/signin.routing.module').then(
        (m) => m.SigninRoutingModule
      ),
  },
  {
    path: '',
    canActivate: [UserLoginInGuard],
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
