import { Component } from '@angular/core';
import { SessionService } from './service/session.service'; // 追加

@Component({
  selector: 'app-root',
  template: `
      <app-header></app-header>
      <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  constructor(private session: SessionService) { // 追加
    this.session.checkLogin();
  }


}
