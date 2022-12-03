import {EventEmitter} from 'events';
import Realm from 'realm';

export const UserSchema = {
  name: 'User',
  properties: {
    nickname: 'string',
    dId: 'string',
  },
  primaryKey: 'dId',
};

export type UserType = {
  nickname: string;
  dId: string;
};

export class User extends EventEmitter {
  private _user: UserType & Realm.Object<UserType>;

  constructor(user: UserType & Realm.Object<UserType>) {
    super();

    this._user = user;

    this._user.addListener((obj, changes) => {
      if (changes.changedProperties.length) {
        this.emit('change');
      }
    });
  }

  get dId() {
    return this._user.dId;
  }

  get nickname() {
    return this._user.nickname;
  }
}
