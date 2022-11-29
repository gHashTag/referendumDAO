import React from 'react';
import {useTypedNavigation} from 'src/hooks';
import {Button} from 'src/components/ui/Button';

export function ImportWalletScreen() {
  const {goBack} = useTypedNavigation();
  return (
    <>
      <Button onPress={goBack} title="go back" />
    </>
  );
}
