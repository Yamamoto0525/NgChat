import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { Session } from '../class/chat';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromSession from '../app-store/reducers';
import * as fromChat from '../chat/store/chat.reducer'; // 追加

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loadingSession$: Observable<boolean>; // 変更
  public loadingChat$: Observable<boolean>; // 追加
  public session$: Observable<Session>;

  constructor(private sessionService: SessionService,
              private store: Store<fromSession.State>,
              private chat: Store<fromChat.State>) { // 追加
    this.loadingSession$ = this.store.select(fromSession.getLoading); // 変更
    this.loadingChat$ = this.chat.select(fromChat.getChatLoading); // 追加
    this.session$ = this.store.select(fromSession.getSession);
  }

  ngOnInit() {
  }

  logout(): void {
    this.sessionService.logout();
  }

}
