import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SigninComponent } from './signin.component';
import { UserLoginInGuard } from 'src/app/guards/user.login.guard';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
    canActivate: [UserLoginInGuard],
    data: { breadcrum: 'sigin', title: 'signin' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninRoutingModule {}
