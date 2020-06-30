import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Session, User } from '../../class/chat';
import { User as fbUser } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as SessionActions from '../actions/session.actions';
import { Observable, of } from 'rxjs';
import { switchMap, take, map, catchError } from 'rxjs/operators';


@Injectable()
export class SessionEffects {

  constructor(private actions$: Actions<SessionActions.SessionUnionActions>,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
  }

  loadSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.loadSessions),
      switchMap(() => {
        return this.afAuth.authState
          .pipe(
            take(1),
            map((result: fbUser | null) => {
              if (!result) {
                // ユーザーが存在しなかった場合は、空のセッションを返す
                return SessionActions.loadSessionsSuccess({ session: new Session() });
              } else {
                return result;
              }
            }),
            catchError(this.handleLoginError(
              'fetchAuth', SessionActions.loadSessionsFailure)
            )
          );
      }),
      // ユーザーの認証下情報を取得
      switchMap((auth: fbUser | any) => {
        // ユーザーが存在しなかった場合は、認証下情報を取得しない
        if (!auth.uid) {
          return of(auth);
        }
        return this.afs
          .collection<User>('users')
          .doc(auth.uid)
          .valueChanges()
          .pipe(
            take(1),
            map((result: User) => {
              return SessionActions.loadSessionsSuccess({
                session: new Session(result)
              });
            }),
            catchError(this.handleLoginError(
              'fetchUser', SessionActions.loadSessionsFailure)
            )
          );
      })
    )
  );

  loginSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.loginSessions),
      map(action => action.payload),
      switchMap((payload: { email: string, password: string }) => {
        return this.afAuth
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then(auth => {
            // ユーザーが存在しなかった場合は、空のセッションを返す
            if (!auth.user.emailVerified) {
              alert('メールアドレスが確認できていません。');
              this.afAuth.signOut()
                .then(() => this.router.navigate(['/account/login']));
              return SessionActions.loginSessionsSuccess({ session: new Session() });
            } else {
              return auth.user;
            }
          })
          .catch(err => {
              alert('ログインに失敗しました。\n' + err);
              return SessionActions.loginSessionsFailure({ error: err });
            }
          );
      }),
      switchMap((auth: fbUser | any) => {
        // ユーザーが存在しなかった場合は、空のセッションを返す
        if (!auth.uid) {
          return of(auth);
        }
        return this.afs
          .collection<User>('users')
          .doc(auth.uid)
          .valueChanges()
          .pipe(
            take(1),
            map((result: User) => {
              alert('ログインしました。');
              this.router.navigate(['/']);
              return SessionActions.loginSessionsSuccess({
                session: new Session(result)
              });
            }),
            catchError(this.handleLoginError(
              'loginUser', SessionActions.loginSessionsFailure, 'login'
            ))
          );
      })
    )
  );

  logoutSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.logoutSessions),
      switchMap(() => this.afAuth.signOut()),
      switchMap(() => {
        return this.router.navigate(['/account/login'])
          .then(() => {
            alert('ログアウトしました。');
            return SessionActions.logoutSessionsSuccess({
              session: new Session()
            });
          });
      }),
      catchError(this.handleLoginError(
        'logoutUser', SessionActions.logoutSessionsFailure, 'logout'
      ))
    )
  );

  // エラー発生時の処理
  private handleLoginError(operation = 'operation', result: any, dialog?: 'login' | 'logout') { // 変更
    return (error: any): Observable<any> => {

      // 失敗した操作の名前、エラーログをconsoleに出力
      console.error(`${operation} failed: ${error.message}`);

      // アラートダイアログの表示 // 追加
      if (dialog === 'login') {
        alert('ログインに失敗しました。\n' + error);
      }

      if (dialog === 'logout') {
        alert('ログアウトに失敗しました。\n' + error);
      }

      // ログアウト処理
      this.afAuth.signOut()
        .then(() => this.router.navigate(['/account/login']));

      // 結果を返して、アプリを持続可能にする
      return of(result);
    };
  }

}
