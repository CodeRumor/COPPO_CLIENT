import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthorisationGuard } from './guards/user.authorisation.guard';
import { UserSignInGuard } from './guards/user.signIn.guard';

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
