import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ThemeColors = {
  dark: {
    background: '#1B2631',
    contentBackground: '#34495E',
    text: '#D6DBDF',
  },
  light: {
    background: '#fff',
    contentBackground: '#eee',
    text: '#555',
  }
};

const SWITCHER_COLOR = {
  true: '#AED6F1',
  false: 'rgba(0,0,0,0.1)'
};

type Theme = 'light' | 'dark';

export default function App() {
  const [theme, setTheme] = useState<Theme>('light');

  const progress = useDerivedValue(() => {
    return withTiming(theme === 'dark' ? 1 : 0);
  });

  const containerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [ThemeColors.light.background, ThemeColors.dark.background]
    );
    return {
      backgroundColor
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [ThemeColors.light.contentBackground, ThemeColors.dark.contentBackground]
    );
    return {
      backgroundColor
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value, 
      [0, 1], 
      [ThemeColors.light.text, ThemeColors.dark.text]
    );
    return { color }
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.View style={[styles.mainContent, contentStyle]}>
          <Animated.Text style={[styles.text, textStyle]}>
            Text
          </Animated.Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggled => {
              setTheme(toggled ? 'dark' : 'light');
            }}
            trackColor={SWITCHER_COLOR}
            thumbColor={'#1B4F72'}
          />
        </Animated.View>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const WIDTH = Dimensions.get('window').width * 0.8;
const HEIGHT = Dimensions.get('window').height * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContent: {
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  text: {
    fontSize: 70,
    fontWeight: 'bold',
    letterSpacing: 20,
    marginBottom: 35,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4
  }
});
