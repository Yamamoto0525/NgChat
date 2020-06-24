import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component'; // 追加
import { LoginComponent } from './login/login.component'; // 追加

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // 追加
  { path: 'sign-up', component: SignUpComponent }, // 追加
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
