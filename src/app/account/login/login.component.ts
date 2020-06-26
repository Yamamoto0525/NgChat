import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { Password } from '../../class/chat';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public account = new Password();

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  submitLogin(e: Event) {
    e.preventDefault();
    this.sessionService.login(this.account);
  }

}
