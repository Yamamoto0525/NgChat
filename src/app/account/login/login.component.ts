import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../service/session.service'; // 追加

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sessionService: SessionService) { } // 追加

  ngOnInit() {}

  submitLogin() { // 追加
    this.sessionService.login();
  }

}
