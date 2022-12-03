import Realm from 'realm';
import {PinSchema} from 'src/models/pin';
import {UserSchema} from 'src/models/user';

export const realm = new Realm({
  schema: [UserSchema, PinSchema],
  schemaVersion: 1,
  onMigration: (oldRealm, newRealm) => {
    // if (oldRealm.schemaVersion < 9) {
    //   const oldObjects = oldRealm.objects('Wallet');
    //   const newObjects = newRealm.objects<{
    //     isHidden: boolean;
    //     cardStyle: string;
    //   }>('Wallet');
    //   for (const objectIndex in oldObjects) {
    //     const newObject = newObjects[objectIndex];
    //     newObject.isHidden = false;
    //     newObject.cardStyle = 'defaultGreen';
    //   }
    // }
  },
});
