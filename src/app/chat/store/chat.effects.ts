import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

import { Comment} from '../../class/chat';
import * as ChatActions from './chat.actions';

@Injectable()
export class ChatEffects {

  constructor(private actions$: Actions,
              private db: AngularFirestore) {
  }

  addChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.addChat),
      map(action => action.payload.chat),
      switchMap((comment: any) => {
        return this.db
          .collection('comments')
          .add(comment)
          .then(() => ChatActions.writeChatSuccess())
          .catch(() => ChatActions.writeChatFail({ error: 'failed to add' }));
      }),
    ));

  updateChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.updateChat),
      map(action => action.payload.chat),
      switchMap((comment: Update<Comment>) => {
        return this.db
          .collection('comments')
          .doc(comment.id.toString())
          .update({ content: comment.changes.content, date: comment.changes.date })
          .then(() => {
            alert('コメントを更新しました');
            return ChatActions.writeChatSuccess();
          })
          .catch(() => ChatActions.writeChatFail({ error: 'failed to update' }));
      }),
    ));

  deleteChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.deleteChat),
      map(action => action.payload.id),
      switchMap((id: string) => {
        return this.db
          .collection('comments')
          .doc(id)
          .delete()
          .then(() => {
            alert('コメントを削除しました');
            return ChatActions.writeChatSuccess();
          })
          .catch(() => ChatActions.writeChatFail({ error: 'failed to delete' }));
      }),
    ));

  loadChats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.loadChats),
      map(action => action.payload.chats),
      switchMap(() => {
        return this.db.collection<Comment>('comments', ref => {
          return ref.orderBy('date', 'asc');
        }).snapshotChanges()
          .pipe(
            map(actions => actions.map(action => {
              // 日付をセットしたコメントを返す
              const data = action.payload.doc.data() as Comment;
              const key = action.payload.doc.id;
              const commentData = new Comment(data.user, data.content);
              commentData.setData(data.date, key);
              return commentData;
            })),
            map((result: Comment[]) => {
              return ChatActions.loadChatsSuccess({
                chats: result
              });
            }),
            catchError(this.handleChatsError(
              'fetchChats', ChatActions.loadChatsFail()
            ))
          );
      })
    ));

  // エラー発生時の処理
  private handleChatsError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {

      // 失敗した操作の名前、エラーログをconsoleに出力
      console.error(`${operation} failed: ${error.message}`);

      // 結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }

}
