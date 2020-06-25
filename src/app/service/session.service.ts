import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; // 追加
import { Router } from '@angular/router'; // 追加

import { Session } from '../class/chat'; // 追加


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public session = new Session(); // 追加
  public sessionSubject = new Subject<Session>(); // 追加
  public sessionState = this.sessionSubject.asObservable(); // 追加

  constructor(private router: Router) { } // 追加

  login(): void { // 追加
    this.session.login = true;
    this.sessionSubject.next(this.session);
    this.router.navigate(['/']);
  }

  logout(): void { // 追加
    this.sessionSubject.next(this.session.reset());
    this.router.navigate(['/account/login']);
  }
}
