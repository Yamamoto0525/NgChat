import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <app-header></app-header>
      <router-outlet></router-outlet> <!--変更-->
  `,
})
export class AppComponent {

  constructor() {
  }

}
