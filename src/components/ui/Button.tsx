import React, {memo} from 'react';
import {useMemo} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
} from 'react-native';

import {Text} from './Text';

export interface ButtonProps extends Omit<ViewProps, 'children'> {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconRight?: string;
  iconRightColor?: string;
  iconLeft?: string;
  iconLeftColor?: string;
  textColor?: string;
}

export enum ButtonVariant {
  text = 'text',
  error = 'error',
  contained = 'contained',
  outlined = 'outlined',
  second = 'second',
}

export enum ButtonSize {
  small = 'small',
  middle = 'middle',
  large = 'large',
}
/**
 * Transmit onPress preferably using callbacks
 */
export const Button = memo(
  ({
    title,
    variant = ButtonVariant.text,
    size = ButtonSize.large,
    style,
    disabled,
    onPress,
    iconRight,
    iconRightColor,
    iconLeft,
    iconLeftColor,
    textColor,
    loading = false,
    ...props
  }: ButtonProps) => {
    const onPressButton = () => {
      if (!(disabled || loading)) {
        onPress?.();
      }
    };

    const containerStyle = [
      styles.container,
      styles[`${variant}Container`] ?? null,
      styles[`${size}Container`] ?? null,
      disabled && `${variant}DisabledContainer` in styles
        ? styles[`${variant}DisabledContainer`]
        : null,
      style,
    ];

    const textStyle = [
      iconLeft && styles.textIconLeft,
      iconRight && styles.textIconRight,
      styles[`${variant}Text`] ?? null,
      disabled && `${variant}DisabledText` in styles
        ? styles[`${variant}DisabledText`]
        : null,
    ];

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPressButton}
        activeOpacity={0.7}
        {...props}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <>
            {iconLeft && (
              <Icon name={iconLeft} color={iconLeftColor} style={styles.icon} />
            )}
            <Text
              t9={size !== ButtonSize.small}
              t12={size === ButtonSize.small}
              style={textStyle}
              color={textColor}>
              {title}
            </Text>
            {iconRight && (
              <Icon
                name={iconRight}
                color={iconRightColor}
                style={styles.icon}
              />
            )}
          </>
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 13, // originally 16 but for android 16 - 3
    paddingHorizontal: 28,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  smallContainer: {
    paddingVertical: 3, // originally 6 but for android 6 - 3
    paddingHorizontal: 12,
    height: 34,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  middleContainer: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    height: 46,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  containedContainer: {
    backgroundColor: '#01B26E',
    borderRadius: 12,
    height: 54,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  containedDisabledContainer: {
    backgroundColor: '#EFEFEF',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  outlinedContainer: {
    borderColor: '#01B26E',
    borderRadius: 12,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  secondContainer: {
    backgroundColor: '#EEF9F5',
    borderRadius: 12,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  secondDisabledContainer: {
    backgroundColor: '#EFEFEF',
  },
  textIconRight: {
    marginRight: 8,
  },
  textIconLeft: {
    marginLeft: 8,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  containedText: {
    color: '#FFFFFF',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  containedDisabledText: {
    color: '#B2B4BB',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  errorText: {
    color: '#E16363',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  secondText: {
    color: '#E16363',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  secondDisabledText: {
    color: '#B2B4BB',
  },
  icon: {
    width: 22,
    height: 22,
  },
});
