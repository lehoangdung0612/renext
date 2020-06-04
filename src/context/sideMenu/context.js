import React from 'react';
import Animated, { Easing } from 'react-native-reanimated';
// import PropTypes from 'prop-types';

const { Value, timing } = Animated;

class Menu {
  constructor() {
    this.toggleProgress = new Value(0);
  }
  openMenu = () => {
    timing(this.toggleProgress, {
      duration: 300,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };
  closeMenu = () => {
    timing(this.toggleProgress, {
      duration: 300,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };
}

const menu = new Menu();

export { menu };
export default React.createContext(menu);
