import React from 'react';
import {Tx} from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import {useTypedNavigation} from 'src/hooks';
import {Button} from 'src/components/ui/Button';
import {SafeAreaView} from 'react-native-safe-area-context';

export function ImportWalletScreen() {
  const {goBack} = useTypedNavigation();
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
