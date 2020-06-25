import { Component, OnInit } from '@angular/core';

import { SessionService } from '../service/session.service'; // 追加
import { Session } from '../class/chat'; // 追加


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public login = false; // 追加

  constructor(public sessionService: SessionService) {
  } // 追加

  ngOnInit() {
    this.sessionService.sessionState.subscribe((session: Session) => { // 追加
      if (session) {
        this.login = session.login;
      }
    });
  }

  logout(): void {  // 追加
    this.sessionService.logout();
  }

}
