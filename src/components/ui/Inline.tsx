import React, {useMemo} from 'react';

import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

export type InlineProps = {
  gap: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};
export const Inline = ({gap, children, style}: InlineProps) => {
  const container = useMemo(
    () => [styles.container, style, {marginHorizontal: gap * -0.5}],
    [gap, style],
  );

  const childrenList = React.Children.toArray(children).filter(el => !!el);
  return (
    <View style={container}>
      {React.Children.map(
        childrenList,
        (child: any) =>
          child &&
          React.cloneElement(child, {
            style: {
              marginHorizontal: gap * 0.5,
              flex: 1,
            },
          }),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
