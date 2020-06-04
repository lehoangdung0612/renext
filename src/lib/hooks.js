import Animated, { Easing } from 'react-native-reanimated';
import { interpolateColor, useValues } from 'react-native-redash';
import util from '@lib/util';

const useColorTransition = colorRange => {
  const [animatedColor] = useValues([0], []);
  const colorValue = interpolateColor(animatedColor, {
    inputRange: util.getAnimateInputRangeFromLength(colorRange.length),
    outputRange: colorRange,
  });

  const animationConfig = {
    duration: 200,
    easing: Easing.inOut(Easing.ease),
  };

  const animateToColor = number => {
    Animated.timing(animatedColor, {
      ...animationConfig,
      toValue: number,
    }).start();
  };

  return [colorValue, animateToColor];
};

export default {
  useColorTransition,
};
