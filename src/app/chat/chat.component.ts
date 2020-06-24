import { Component, OnInit } from '@angular/core';
import { Comment, User } from '../class/chat';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const CURRENT_USER: User = new User(1, 'Tanaka Jiro');
const ANOTHER_USER: User = new User(2, 'Suzuki Taro');

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public content = '';
  public comments: Observable<Comment[]>;
  public currentUser = CURRENT_USER;

  // DI（依存性注入する機能を指定）
  constructor(private db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.comments = this.db
      .collection<Comment>('comments', ref => {
        return ref.orderBy('date', 'asc');
      })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          // 日付をセットしたコメントを返す
          const data = action.payload.doc.data() as Comment;
          const key = action.payload.doc.id;
          const commentData = new Comment(data.user, data.content);
          commentData.setData(data.date, key);
          return commentData;
        })));
  }

  // 新しいコメントを追加
  addComment(e: Event, comment: string) {
    if (comment) {
      this.db
        .collection('comments')
        .add(new Comment(this.currentUser, comment).deserialize());
      this.content = '';
    }
  }

  // 編集フィールドの切り替え
  toggleEditComment(comment: Comment) {
    comment.editFlag = (!comment.editFlag);
  }

  // コメントを更新する
  saveEditComment(comment: Comment) {
    this.db
      .collection('comments')
      .doc(comment.key)
      .update({
        content: comment.content,
        date: comment.date
      })
      .then(() => {
        alert('コメントを更新しました');
        comment.editFlag = false;
      });
  }

  // コメントをリセットする
  resetEditComment(comment: Comment) {
    comment.content = '';
  }

  // コメントを削除する
  deleteComment(key: string) {
    this.db
      .collection('comments')
      .doc(key)
      .delete()
      .then(() => {
        alert('コメントを削除しました');
      });
  }

}
