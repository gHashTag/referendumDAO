import React from 'react';
import {useTypedNavigation, useApp} from 'src/hooks';
import {Button} from 'src/components/ui/Button';
import {SafeAreaView} from 'react-native-safe-area-context';

export function ImportWalletScreen() {
  const {goBack} = useTypedNavigation();
  const app = useApp();
  const importWallet = () => {
    console.log('importWallet');
  };
  return (
    <SafeAreaView>
      <Button onPress={goBack} title="go back" />
      <Button onPress={importWallet} title="import wallet" />
    </SafeAreaView>
  );
}
