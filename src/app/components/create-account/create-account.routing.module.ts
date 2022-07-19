import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateAccountComponent } from './create-account.component';
import { UserLoginInGuard } from 'src/app/guards/user.login.guard';

const routes: Routes = [
  {
    path: '',
    component: CreateAccountComponent,
    canActivate: [UserLoginInGuard],
    data: { breadcrum: 'create-account', title: 'create-account' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAccountRoutingModule {}
