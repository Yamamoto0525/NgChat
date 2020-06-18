import { Component } from '@angular/core';
import { Comment, User } from './class/chat';


const CURRENT_USER: User = new User(1, 'Tanaka Jiro');
const ANOTHER_USER: User = new User(2, 'Suzuki Taro');
const COMMENTS: Comment[] = [ // クラスを元にコメントを作成
  new Comment(ANOTHER_USER, 'Suzukiの１つ目のコメントです。'),
  new Comment(ANOTHER_USER, 'Suzukiの2つ目のコメントです。'),
  new Comment(CURRENT_USER, 'Tanakaの１つ目のコメントです。'),
  new Comment(ANOTHER_USER, 'Suzukiの3つ目のコメントです。'),
  new Comment(CURRENT_USER, 'Tanakaの2つ目のコメントです。')
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public content = '';
  public comments = COMMENTS;
  public currentUser = CURRENT_USER;

  // 新しいコメントを追加
  addComment(comment: string) {
    if (comment) {
      this.comments.push(new Comment(this.currentUser, comment));
    }
  }
}
