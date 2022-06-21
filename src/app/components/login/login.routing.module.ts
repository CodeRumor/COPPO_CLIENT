import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { UserSignInGuard } from 'src/app/guards/user.signIn.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [UserSignInGuard],
    data: { breadcrum: 'login', title: 'login' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
