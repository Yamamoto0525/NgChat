import { Component, OnInit } from '@angular/core';
import { Password } from '../../class/chat'; // 追加
import { SessionService } from '../../service/session.service'; // 追加

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public account = new Password(); // 追加

  constructor(private session: SessionService) {} // 追加

  ngOnInit(): void {
  }

  // アカウント作成
  submitSignUp(e: Event): void { // 追加
    e.preventDefault();
    // パスワード確認
    if (this.account.password !== this.account.passwordConfirmation) {
      alert('パスワードが異なります。');
      return;
    }
    this.session.signup(this.account);
    this.account.reset();
  }

}
