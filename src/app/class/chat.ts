import * as moment from 'moment';

export class User {
  uid: number;
  name: string;

  constructor(uid: number, name: string) {
    this.uid = uid;
    this.name = name;
  }

  deserialize() { // 追加
    return Object.assign({}, this);
  }
}

export class Comment {
  user: User;
  initial: string;
  content: string;
  date: number;
  key?: string; // 追加
  editFlag?: boolean; // 追加

  constructor(user: User, content: string) {
    this.user = user;
    this.initial = user.name.slice(0, 1);
    this.content = content;
    this.date = +moment();
  }

  deserialize() { // 追加
    this.user = this.user.deserialize();
    return Object.assign({}, this);
  }

  // 取得した日付を反映し、更新フラグをつける
  setData(date: number, key: string): Comment { // 更新
    this.date = date;
    this.key = key; // 追加
    this.editFlag = false; // 追加
    return this;
  }
}
