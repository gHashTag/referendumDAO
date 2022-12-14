import {NativeModules} from 'react-native';

const {RNHaptic} = NativeModules;

export enum HapticEffects {
  selection = 'selection',
  success = 'success',
  warning = 'warning',
  error = 'error',
  impactLight = 'impactLight',
}
// Нужно добавить нативный модуль в проект android и ios
export const vibrate = (effect = HapticEffects.selection) => {
  RNHaptic.vibrate(effect);
};
