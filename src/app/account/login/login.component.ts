import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { Password } from '../../class/chat'; // 追加

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public account = new Password(); // 追加

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  submitLogin(e: Event) { // 変更
    e.preventDefault();
    this.sessionService.login(this.account);
  }

}
