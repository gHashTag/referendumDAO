import {createContext} from 'react';

import {EventEmitter} from 'events';

import {AppState} from 'react-native';

import {User, UserType} from 'src/models/user';
import {subSeconds} from 'date-fns';
import {USER_LAST_ACTIVITY_TIMEOUT_SECONDS} from 'src/variables';
import {realm} from 'src/models/realm';
import {generateUUID} from 'src/utils';
import {Pin, pin} from 'src/models/pin';

class App extends EventEmitter {
  private last_activity: Date;
  private _user: User;
  private _pin: Pin;
  private authenticated: boolean = false;
  private appStatus: AppStatus = AppStatus.inactive;

  constructor() {
    super();
    this.last_activity = new Date();
    AppState.addEventListener('change', this.onAppStatusChanged.bind(this));

    this._pin = pin;
    this._user = this.loadUser();
  }

  async onOpenApp(): Promise<void> {
    try {
      await this._pin.getPassword();
    } catch (e) {
      console.log(e);
      return Promise.reject('user_not_found');
    }
    await this.auth();

    this.appStatus = getAppStatus();

    AppState.addEventListener('change', this.onAppStatusChanged.bind(this));

    return Promise.resolve();
  }

  loadUser(): User {
    const users = realm.objects<UserType>('User');

    if (!users.length) {
      realm.write(() => {
        realm.create('User', {
          nickname: 'Account #1',
          dId: generateUUID(),
        });
      });
    }
    return new User(users[0] as UserType & Realm.Object<UserType>);
  }

  async auth() {
    if (this._pin.biometry) {
      try {
        await this._pin.biometryAuth();
        //vibrate(HapticEffects.success);
        this.authenticated = true;
      } catch (error) {
        console.log(error);
      }
    }

    if (!this.authenticated) {
      await this._pin.pinAuth();
      //vibrate(HapticEffects.success);
      this.authenticated = true;
    }
  }

  get user() {
    return this._user;
  }

  touchLastActivity() {
    this.last_activity = new Date();
  }

  isOutdatedLastActivity() {
    return (
      this.last_activity <
      subSeconds(new Date(), USER_LAST_ACTIVITY_TIMEOUT_SECONDS)
    );
  }

  async onAppStatusChanged() {
    const appStatus = getAppStatus();
    if (this.appStatus !== appStatus) {
      switch (appStatus) {
        case AppStatus.active:
          if (this.isOutdatedLastActivity()) {
            this.authenticated = false;
            await this.auth();
          }
          break;
        case AppStatus.inactive:
          this.touchLastActivity();
          break;
      }

      this.appStatus = appStatus;
    }
  }
}

enum AppStatus {
  inactive,
  active,
}

function getAppStatus() {
  return AppState.currentState === 'active'
    ? AppStatus.active
    : AppStatus.inactive;
}

export const app = new App();

export const AppContext = createContext(app);
