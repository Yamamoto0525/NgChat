import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { Session } from '../class/chat';
import { Observable } from 'rxjs'; // 追加
import { Store } from '@ngrx/store'; // 追加
import * as fromSession from '../app-store/reducers'; // 追加

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loading$: Observable<boolean>; // 追加
  public session$: Observable<Session>; // 追加
  // public login = false; // 削除

  constructor(private sessionService: SessionService,
              private store: Store<fromSession.State>) { // 変更
    this.loading$ = this.store.select(fromSession.getLoading); // 追加
    this.session$ = this.store.select(fromSession.getSession);
  }

  ngOnInit() {
    // 削除
  }

  logout(): void {
    this.sessionService.logout();
  }

}
