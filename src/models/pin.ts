import {addSeconds, isAfter} from 'date-fns';
import {EventEmitter} from 'events';
import {Platform} from 'react-native';
import Keychain, {
  getGenericPassword,
  resetGenericPassword,
  setGenericPassword,
  STORAGE_TYPE,
} from 'react-native-keychain';

import TouchID from 'react-native-touch-id';
import Realm from 'realm';
import {BiometryType} from 'src/types';
import {PIN_BANNED_ATTEMPTS, PIN_BANNED_TIMEOUT_SECONDS} from 'src/variables';
import {app} from 'src/contexts/app';
import {realm} from 'src/models/realm';
import {User} from 'src/models/user';

export const PinSchema = {
  name: 'Pin',
  properties: {
    biometry: 'bool',
    biometryAttempts: 'int?',
    biometryBannedUntil: 'date?',
    pinAttempts: 'int?',
    pinBannedUntil: 'date?',
  },
};

const keychainConfig = {
  storage: STORAGE_TYPE.AES,
  accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

export type PinType = {
  biometry: boolean;
  biometryAttempts?: number;
  biometryBannedUntil?: Date;
  pinAttempts: number;
  pinBannedUntil?: Date;
};

export class Pin extends EventEmitter {
  private _pin: PinType & Realm.Object<PinType>;
  private _biometryType: BiometryType = BiometryType.none;

  constructor() {
    super();

    TouchID.isSupported({unifiedErrors: false})
      .then(biometryType => {
        this._biometryType =
          Platform.select<BiometryType>({
            ios: biometryType as BiometryType,
            android: biometryType
              ? BiometryType.fingerprint
              : BiometryType.none,
          }) ?? BiometryType.none;
      })
      .catch(() => {
        this._biometryType = BiometryType.none;
      });

    const pins = realm.objects<PinType>('Pin');

    if (!pins.length) {
      realm.write(() => {
        realm.create('Pin', {
          biometry: false,
        });
      });
    }

    this._pin = pins[0] as PinType & Realm.Object<PinType>;

    this._pin.addListener((obj, {changedProperties}) => {
      this.emit('change');
    });
  }

  get pin() {
    return this._pin;
  }
  get biometryType() {
    return this._biometryType;
  }

  get pinBannedUntil() {
    return this._pin.pinBannedUntil;
  }

  get pinAttempts() {
    return this._pin.pinAttempts;
  }

  get canEnterPin() {
    if (this.pinBannedUntil && isAfter(new Date(), this.pinBannedUntil)) {
      realm.write(() => {
        this._pin.pinBannedUntil = undefined;
        this._pin.pinAttempts = 0;
      });
    }

    return this.pinAttempts < PIN_BANNED_ATTEMPTS;
  }

  get biometry() {
    return this._pin.biometry;
  }

  set biometry(value) {
    this._pin.biometry = value;
  }

  async getPassword() {
    const creds = await getGenericPassword();
    if (!creds || !creds.password || creds.username !== app.user.dId) {
      return Promise.reject('password_not_found');
    }

    return creds.password;
  }

  async verifyPin(pin: string) {
    if (this.canEnterPin) {
      const password = await this.getPassword();
      return password === pin ? Promise.resolve() : Promise.reject();
    }

    return Promise.reject();
  }

  async setPin(newPin: string) {
    await setGenericPassword(app.user.dId, newPin, keychainConfig);
  }

  async resetPin() {
    await resetGenericPassword();
  }

  successEnter() {
    realm.write(() => {
      this._pin.pinBannedUntil = undefined;
      this._pin.pinAttempts = 0;
    });
  }

  failureEnter() {
    realm.write(() => {
      this._pin.pinAttempts = this._pin.pinAttempts + 1;

      if (this._pin.pinAttempts === PIN_BANNED_ATTEMPTS) {
        this._pin.pinBannedUntil = addSeconds(
          new Date(),
          PIN_BANNED_TIMEOUT_SECONDS,
        );
      }
    });
  }

  biometryAuth() {
    return TouchID.authenticate('', {
      title: 'Fingerprint Login', // Android
      imageColor: 'green',
      fallbackLabel: 'Show Passcode',
    });
  }

  pinAuth() {
    return new Promise<void>(async (resolve, _reject) => {
      this.emit('modal', {type: 'pin'});
      const password = await this.getPassword();

      const callback = (value: string) => {
        if (password === value) {
          this.off('enterPin', callback);
          this.emit('modal', {type: 'splash'});
          resolve();
        } else {
          this.emit('errorPin', 'not match');
        }
      };

      this.on('enterPin', callback);
    });
  }
}

export const pin = new Pin();
