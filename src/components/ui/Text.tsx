import * as React from 'react';
import {
  Platform,
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

export type TextProps = Omit<RNTextProps, 'style' | 'children'> & {
  children?: React.ReactNode;
  t0?: boolean;
  t1?: boolean;
  t2?: boolean;
  t3?: boolean;
  t4?: boolean;
  t5?: boolean;
  t6?: boolean;
  t7?: boolean;
  t8?: boolean;
  t9?: boolean;
  t10?: boolean;
  t11?: boolean;
  t12?: boolean;
  t13?: boolean;
  t14?: boolean;
  t15?: boolean;
  center?: boolean;
  right?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export const Text = ({
  t0,
  t1,
  t2,
  t3,
  t4,
  t5,
  t6,
  t7,
  t8,
  t9,
  t10,
  t11,
  t12,
  t13,
  t14,
  t15,
  style,
  children = undefined,
  center,
  right,
  color,
  ...props
}: TextProps) => {
  return (
    <RNText
      allowFontScaling={false}
      style={[
        t0 && StyleSheet.flatten([page.t0Style, style]),
        t1 && StyleSheet.flatten([page.t1Style, style]),
        t2 && StyleSheet.flatten([page.t2Style, style]),
        t3 && StyleSheet.flatten([page.t3Style, style]),
        t4 && StyleSheet.flatten([page.t4Style, style]),
        t5 && StyleSheet.flatten([page.t5Style, style]),
        t6 && StyleSheet.flatten([page.t6Style, style]),
        t7 && StyleSheet.flatten([page.t7Style, style]),
        t8 && StyleSheet.flatten([page.t8Style, style]),
        t9 && StyleSheet.flatten([page.t9Style, style]),
        t10 && StyleSheet.flatten([page.t10Style, style]),
        t11 && StyleSheet.flatten([page.t11Style, style]),
        t12 && StyleSheet.flatten([page.t12Style, style]),
        t13 && StyleSheet.flatten([page.t13Style, style]),
        t14 && StyleSheet.flatten([page.t14Style, style]),
        t15 && StyleSheet.flatten([page.t15Style, style]),
        !!color && {color},
        center && page.center,
        right && page.right,
      ]}
      {...props}>
      {children}
    </RNText>
  );
};
type FontT = StyleProp<TextStyle>;
const textBase1 = '#2E312D';

const sfProTextRegular400: FontT = Platform.select({
  ios: {
    fontFamily: 'SF Pro Display',
    fontWeight: '400',
  },
  android: {
    fontFamily: 'SF-Pro-Display-Regular',
  },
});

const page = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  t0Style: {
    fontSize: 40,
    lineHeight: 46,
    color: textBase1,
  },
  t1Style: {
    fontSize: 34,
    lineHeight: 46,
    color: textBase1,
  },
  t2Style: {
    fontSize: 28,
    lineHeight: 38,
    color: textBase1,
  },
  t3Style: {
    fontSize: 22,
    lineHeight: 30,
    color: textBase1,
  },
  t4Style: {
    fontSize: 22,
    lineHeight: 30,
    color: textBase1,
  },
  t5Style: {
    fontSize: 18,
    lineHeight: 24,
    color: textBase1,
  },
  t6Style: {
    fontSize: 18,
    lineHeight: 24,
    color: textBase1,
  },
  t7Style: {
    fontSize: 16,
    lineHeight: 22,
    color: textBase1,
  },
  t8Style: {
    fontSize: 16,
    lineHeight: 22,
    color: textBase1,
  },
  t9Style: {
    fontSize: 16,
    lineHeight: 22,
    color: textBase1,
  },
  t10Style: {
    fontSize: 14,
    lineHeight: 18,
    color: textBase1,
  },
  t11Style: {
    fontSize: 14,
    lineHeight: 18,
    color: textBase1,
  },
  t12Style: {
    fontSize: 14,
    lineHeight: 18,
    color: textBase1,
  },
  t13Style: {
    fontSize: 12,
    lineHeight: 16,
    color: textBase1,
  },
  t14Style: {
    fontSize: 10,
    lineHeight: 12,
    color: textBase1,
  },
  t15Style: {
    fontSize: 10,
    lineHeight: 12,
    color: textBase1,
  },
});
