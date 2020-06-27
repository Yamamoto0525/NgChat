import { Component } from '@angular/core';
import { SessionService } from './service/session.service';

@Component({
  selector: 'app-root',
  template: `
      <app-header></app-header>
      <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  constructor(private session: SessionService) {
    this.session.checkLogin();
  }


}
