import { NgModule } from '@angular/core';
// CommonModuleを削除
import { SharedModule } from '../shared/shared.module'; // 追加

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
    // CommonModuleを削除
    SharedModule, // 追加
    AccountRoutingModule,
  ]
})
export class AccountModule { }
