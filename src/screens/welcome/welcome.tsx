import React, {useRef} from 'react';

import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {SquircleView} from 'react-native-figma-squircle';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useEvent,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Inline, Spacer, Text} from 'src/components/ui';
import {Button, ButtonSize, ButtonVariant} from 'src/components/ui/Button';

import {useTypedNavigation} from 'src/hooks';

const data = [
  {
    title: 'Referendum DAO',
    description:
      'We are a thermometer of democracy and direct open legitimate elections in all countries of the world.',
  },
  {
    title: 'Cross-platform dApp',
    description:
      'We are creating a decentralized mobile application on React Native, which has an open source code. This application is based on Realm and Cosmos technologies.',
  },
];

const Logo = () => {
  return (
    <SquircleView
      squircleParams={{
        cornerSmoothing: 0.6,
        cornerRadius: 18,
        fillColor: 'pink',
      }}
      style={page.logo}
    />
  );
};

export const WelcomeScreen = () => {
  const navigation = useTypedNavigation();
  const {top, bottom} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const scrollRef = useRef<Animated.ScrollView>(null);

  const dataCount = data.length - 1;
  const scrollRange = [0, width * dataCount];

  const scrollX = useSharedValue(0);
  const scrollItem = useSharedValue(1);

  const scrollHandler = useAnimatedScrollHandler(({contentOffset: {x}}) => {
    scrollItem.value = Math.round(x / width);
    scrollX.value = x;
  });

  const maxLine = width * 0.8;
  const lineAnimation = useAnimatedStyle(() => ({
    width: interpolate(scrollX.value, scrollRange, [0, maxLine], 'clamp'),
  }));

  const onPressLeft = () => {
    scrollRef.current?.scrollTo({
      x: (scrollItem.value - 1) * width,
      animated: true,
    });
    if (scrollItem.value > 0) {
      scrollItem.value = scrollItem.value - 1;
    }
  };

  const onPressRight = () => {
    scrollRef.current?.scrollTo({
      x: (scrollItem.value + 1) * width,
      animated: true,
    });
    if (scrollItem.value < dataCount) {
      scrollItem.value = scrollItem.value + 1;
    }
  };

  return (
    <>
      <Spacer height={top} />
      <View style={page.flexOne}>
        <Logo />
        <Animated.ScrollView
          scrollEventThrottle={16}
          bounces={false}
          ref={scrollRef}
          onScroll={scrollHandler}
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          horizontal>
          {data.map(({title, description}, index) => (
            <View key={index} style={[page.infoItem, {width}]}>
              <Text t3 center>
                {title}
              </Text>
              <Spacer height={10} />
              <Text t9 center>
                {description}
              </Text>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
      <View style={[page.line, {width: maxLine}]}>
        <Animated.View style={[page.indicator, lineAnimation]} />
      </View>
      <Inline gap={10}>
        <Button
          variant={ButtonVariant.contained}
          size={ButtonSize.small}
          onPress={onPressLeft}
          title="Left"
        />
        <Button
          variant={ButtonVariant.contained}
          onPress={onPressRight}
          size={ButtonSize.small}
          title="Right"
        />
      </Inline>
      <SquircleView
        squircleParams={{
          cornerSmoothing: 0.6,
          topLeftCornerRadius: 12,
          topRightCornerRadius: 12,
          fillColor: '#898989',
        }}
        style={[
          page.bottomContainer,
          {paddingBottom: paddingVertical + bottom},
        ]}>
        <Button variant={ButtonVariant.contained} title="Create wallet" />
        <Spacer height={13} />
        <Button variant={ButtonVariant.contained} title="Import mnemonic" />
      </SquircleView>
    </>
  );
};

const paddingVertical = 37;

const page = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  logo: {
    width: 215,
    height: 120,
    alignSelf: 'center',
  },
  bottomContainer: {
    width: '100%',
    paddingVertical,
    paddingHorizontal: 37.5,
  },
  infoItem: {
    paddingHorizontal: 20,
  },
  indicator: {
    height: 4,
    borderRadius: 4,
    backgroundColor: '#000000',
  },
  line: {
    height: 4,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
  },
});
