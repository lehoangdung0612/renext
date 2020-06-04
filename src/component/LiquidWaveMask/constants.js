import { AppSize } from '@theme/index';
import Animated from 'react-native-reanimated';

const { SpringUtils } = Animated;

export const initialSideWidth = 0;
export const borderDelta = 0.005;
export const maxDist = AppSize.screen.width - initialSideWidth;
export const maxDistRate = maxDist / AppSize.screen.width;
export const shouldTransitionBorder = 0.7;
export const shouldTransitionBorderX =
  (1 - shouldTransitionBorder) * AppSize.screen.width;
export const shouldTransitionBorderDistance =
  shouldTransitionBorder * AppSize.screen.width;
export const defaultSpringConfig = SpringUtils.makeDefaultConfig();
export const minHorizontalRadius = 30;
export const maxHorizontalRadius = 70;
export const curveVeritcalHorizontalRate = Math.E;
export const springVelocity = 50;
export const initialWaveCenterY = AppSize.screen.height * 0.7;
