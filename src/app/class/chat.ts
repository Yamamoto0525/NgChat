import * as moment from 'moment';

export class User {
  uid: string;
  name: string;

  constructor(uid?: string, name?: string) {
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
  user: User;

  constructor(init?: User) { // 変更
    this.login = (!!init);
    this.user = (init) ? new User(init.uid, init.name) : new User();
  }

  reset(): Session {
    this.login = false;
    this.user = new User();
    return this;
  }
}

export class Password {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }

  reset(): void {
    this.name = '';
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }
}
