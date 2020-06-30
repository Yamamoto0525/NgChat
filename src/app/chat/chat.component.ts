import { Component, OnInit } from '@angular/core';
import { Comment, User } from '../class/chat';
// import { AngularFirestore } from '@angular/fire/firestore'; // 削除
// import { Observable } from 'rxjs'; // 削除
// import { map } from 'rxjs/operators'; // 削除

import { Store } from '@ngrx/store';
import * as fromSession from '../app-store/reducers';
import * as fromChat from './store/chat.reducer'; // 追加
import * as ChatActions from './store/chat.actions'; // 追加

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public content = '';
  public comments: Comment[] = []; // 変更
  public currentUser: User;

  // DI（依存性注入する機能を指定）
  constructor(private chat: Store<fromChat.State>, // 追加
              // private db: AngularFirestore, // 削除
              private store: Store<fromSession.State>) {
    this.store
      .select(fromSession.getSession)
      .subscribe(data => {
        this.currentUser = data.user;
      });
    this.chat.select(fromChat.selectAllChats)
      .subscribe((comments: Comment[]) => {
        this.comments = [];
        comments.forEach((comment: Comment) => {
          this.comments.push(
            new Comment(comment.user, comment.content)
              .setData(comment.date, comment.id)
          );
        });
      }); // 追加
  }

  ngOnInit() { // 変更
    this.store.dispatch(ChatActions.loadChats({ chats: [] }));
  }

  // 新しいコメントを追加
  addComment(e: Event, content: string) { // 変更
    e.preventDefault();
    if (content) {
      const tmpComment = new Comment(this.currentUser, content).deserialize();
      this.chat.dispatch(ChatActions.addChat({ chat: tmpComment }));
      this.content = '';
    }
  }

  // 編集フィールドの切り替え
  toggleEditComment(comment: Comment) { // 変更
    comment.editFlag = !comment.editFlag;
  }

  // コメントを更新する
  saveEditComment(comment: Comment) { // 変更
    comment.editFlag = false;
    this.chat.dispatch(ChatActions.updateChat({ chat: { id: comment.id, changes: comment } }));
  }

  // コメントをリセットする
  resetEditComment(comment: Comment) { // 変更
    comment.content = '';
  }

  // コメントを削除する
  deleteComment(key: string) { // 変更
    this.chat.dispatch(ChatActions.deleteChat({ id: key }));
  }

}
