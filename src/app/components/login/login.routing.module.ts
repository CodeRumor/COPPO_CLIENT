import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { UserLoginInGuard } from 'src/app/guards/user.login.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [UserLoginInGuard],
    data: { breadcrum: 'login', title: 'login' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
