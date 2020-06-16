import { Component } from '@angular/core';
import { Comment } from './class/chat'; // 追加

const COMMENTS: Comment[] = [ // 追加
  { name: 'Suzuki Taro',  content: '１つ目のコメントです。'},
  { name: 'Suzuki Taro',  content: '２つ目のコメントです。'},
  { name: 'Suzuki Taro',  content: '３つ目のコメントです。'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  content = '';
  public comments = COMMENTS; // 追加
}
