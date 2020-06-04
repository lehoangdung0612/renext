import {
  defaultSpringConfig,
  springVelocity,
} from '@component/LiquidWaveMask/constants';
import Animated from 'react-native-reanimated';

const {
  block,
  greaterOrEq,
  cond,
  multiply,
  Clock,
  spring,
  Value,
  set,
  startClock,
} = Animated;

const followPointer = translationX => {
  return translationX;
};

const springToEnd = ({ from, to }) => {
  const clock = new Clock();
  const state = {
    position: new Value(0),
    finished: new Value(1),
    velocity: new Value(springVelocity),
    time: new Value(0),
  };
  const config = {
    ...defaultSpringConfig,
    toValue: new Value(to),
  };

  return block([
    cond(state.finished, [
      set(state.finished, 0),
      set(state.position, from),
      startClock(clock),
    ]),
    spring(clock, state, config),
    state.position,
  ]);
};

const revertVector = animatedValue => multiply(animatedValue, -1);

const getAbsoluteValue = animatedValue =>
  cond(
    greaterOrEq(animatedValue, 0),
    animatedValue,
    multiply(animatedValue, -1),
  );

export { followPointer, revertVector, springToEnd, getAbsoluteValue };
