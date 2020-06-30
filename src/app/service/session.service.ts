import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // 変更
import { map, switchMap, take } from 'rxjs/operators';
// import { User as fbUser } from 'firebase/app'; // 削除

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store'; // 追加

import { Password, User } from '../class/chat'; // 変更
import * as fromSession from '../app-store/reducers'; // 追加
import * as SessionActions from '../app-store/actions/session.actions'; // 追加

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // public session = new Session(); // 削除
  // public sessionSubject = new Subject<Session>(); // 削除
  // public sessionState = this.sessionSubject.asObservable(); // 削除

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private store: Store<fromSession.State>) { // 追加
  }

  // ログイン状況確認
  checkLogin(): void { // 変更
    this.store.dispatch(SessionActions.loadSessions());
  }

  // ログイン状況確認(State)
  checkLoginState(): Observable<{ login: boolean }> { // 変更
    return this.afAuth
      .authState
      .pipe(
        map((auth: any) => {
          // ログイン状態を返り値の有無で判断
          return { login: !!auth };
        })
      );
  }

  login(account: Password): void { // 変更
    this.store.dispatch(SessionActions.loginSessions({ email: account.email, password: account.password }));
  }

  logout(): void { // 変更
    this.store.dispatch(SessionActions.logoutSessions());
  }

  // アカウント作成
  signup(account: Password): void {
    let auth: firebase.auth.UserCredential;
    this.afAuth
      .createUserWithEmailAndPassword(account.email, account.password) // アカウント作成
      .then((TEMP_AUTH: firebase.auth.UserCredential) => {
        auth = TEMP_AUTH;
        return auth.user.sendEmailVerification(); // メールアドレス確認
      })
      .then(() => {
        return this.createUser(new User(auth.user.uid, account.name));
      })
      .then(() => this.afAuth.signOut())
      .then(() => {
        account.reset();
        alert('メールアドレス確認メールを送信しました。');
      })
      .catch(err => {
        console.log(err);
        alert('アカウントの作成に失敗しました。\n' + err);
      });
  }

  // ユーザーを作成
  private createUser(user: User): Promise<void> {
    return this.afs
      .collection('users')
      .doc(user.uid)
      .set(user.deserialize());
  }

  // ユーザーを取得
  private getUser(uid: string): Observable<any> {
    return this.afs
      .collection('users')
      .doc(uid)
      .valueChanges()
      .pipe(
        take(1),
        switchMap((user: User) => {
          if (user) {
            return of(new User(uid, user.name));
          } else {
            return of(null);
          }
        })
      );
  }
}
