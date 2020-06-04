// @flow
import Animated from 'react-native-reanimated';

const { Easing } = Animated;

function fadeIn(duration = 400, spring = false) {
  const transitionSpec = spring
    ? {
        timing: Animated.spring,
        tension: 10,
        useNativeDriver: true,
      }
    : {
        duration,
        easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
        timing: Animated.timing,
      };

  return {
    transitionSpec,
    screenInterpolator: ({ position, scene }) => {
      const { index } = scene;

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1],
      });

      return { opacity };
    },
  };
}

const screenFadeIn = ({ current: { progress } }) => {
  const opacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  return {
    cardStyle: {
      opacity,
    },
  };
};

export default {
  fadeIn,
  screenFadeIn,
};
