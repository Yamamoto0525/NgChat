import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { AccountModule } from './account/account.module';
import { AuthGuard } from './guard/auth.guard'; // 追加
import { LoginGuard } from './guard/login.guard'; // 追加

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    canActivate: [LoginGuard],  // 追加
  },
  {
    path: '',
    component: ChatComponent,
    canActivate: [AuthGuard],  // 追加
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AccountModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
