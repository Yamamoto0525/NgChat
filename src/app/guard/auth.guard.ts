import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';  // 変更
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // 更新

import { SessionService } from '../service/session.service';  // 追加

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private session: SessionService,  // 追加
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.session // 変更
      .checkLoginState()
      .pipe(
        map(session => {
          // ログインしていない場合はログイン画面に遷移
          if (!session.login) {
            this.router.navigate([ '/account/login' ]);
          }
          return session.login;
        })
      );
  }

}
