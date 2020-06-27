import * as moment from 'moment';

export class User {
  uid: string; // 変更(number -> string)
  name: string;

  constructor(uid?: string, name?: string) { // 変更
    this.uid = (uid) ? uid : '';
    this.name = (name) ? name : '';
  }

  deserialize() {
    return Object.assign({}, this);
  }
}

export class Comment {
  user: User;
  initial: string;
  content: string;
  date: number;
  key?: string;
  editFlag?: boolean;

  constructor(user: User, content: string) {
    this.user = user;
    this.initial = user.name.slice(0, 1);
    this.content = content;
    this.date = +moment();
  }

  deserialize() {
    this.user = this.user.deserialize();
    return Object.assign({}, this);
  }

  // 取得した日付を反映し、更新フラグをつける
  setData(date: number, key: string): Comment {
    this.date = date;
    this.key = key;
    this.editFlag = false;
    return this;
  }
}

export class Session {
  login: boolean;
  user: User; // 追加

  constructor() {
    this.login = false;
    this.user = new User(); // 追加
  }

  reset(): Session {
    this.login = false;
    this.user =  new User(); // 追加
    return this;
  }
}

export class Password {
  name: string; // 追加
  email: string;
  password: string;
  passwordConfirmation: string;

  constructor() {
    this.name = ''; // 追加
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }

  reset(): void {
    this.name = ''; // 追加
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }
}
