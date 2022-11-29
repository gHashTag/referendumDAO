import React from 'react';
import {App} from 'src/App';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function AppWithProviders() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.flexOne}>
        <StatusBar barStyle="light-content" />
        <App />
        {/* <Modals initialModal={{type: 'splash'}} />
      <Notifications /> */}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});
