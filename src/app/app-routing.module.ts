import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component'; // 追加
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { AccountModule } from './account/account.module'; // 追加

const routes: Routes = [ // 更新
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule), // 追加
  },
  { path: '', component: ChatComponent },
  { path: '**', component: PageNotFoundComponent }, // 追加
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AccountModule,  // 追加
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
