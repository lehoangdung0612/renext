/**
 *
 * LiquidWaveMask
 *
 */

import LiquidWave from '@component/LiquidWave/index';
import {
  revertVector,
  springToEnd,
} from '@component/LiquidWaveMask/animationHelper';
import {
  curveVeritcalHorizontalRate,
  shouldTransitionBorderX,
  initialWaveCenterY,
} from '@component/LiquidWaveMask/constants';
import MaskedView from '@react-native-community/masked-view';
import { AppSize, AppStyle } from '@theme/index';
import React from 'react';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { onGestureEvent, useValues } from 'react-native-redash';
import { maxHorizontalRadius, minHorizontalRadius } from './constants';
import style from './style';
// import PropTypes from 'prop-types';

const {
  interpolate,
  cond,
  useCode,
  block,
  eq,
  set,
  greaterOrEq,
  multiply,
  add,
  Extrapolate,
  sub,
  // call,
} = Animated;

const { width: screenWidth, height: screenHeight } = AppSize.screen;

function LiquidWaveMask({ children }) {
  const [
    translationX,
    translationY,
    y,
    velocityX,
    velocityY,
    absoluteX,
    absoluteY,
    state,
  ] = useValues([0, 0, 0, 0, 0, 0, initialWaveCenterY, State.UNDETERMINED]);

  const [
    waveCenterY,
    waveVertRadius,
    sideWidth,
    previousSideWidth,
  ] = useValues([
    initialWaveCenterY,
    minHorizontalRadius * curveVeritcalHorizontalRate,
    0,
    0,
  ]);

  const waveHorRadius = interpolate(velocityX, {
    inputRange: [-screenWidth, 0],
    outputRange: [maxHorizontalRadius, minHorizontalRadius],
    extrapolate: Extrapolate.CLAMP,
  });

  const gestureHandler = onGestureEvent({
    translationX,
    translationY,
    y,
    state,
    velocityX,
    velocityY,
    absoluteX,
    absoluteY,
  });

  const animateWidth = () => {
    return block([
      cond(
        eq(state, State.ACTIVE),
        [set(sideWidth, add(previousSideWidth, revertVector(translationX)))],
        [
          cond(eq(state, State.END), [
            cond(
              greaterOrEq(absoluteX, shouldTransitionBorderX),
              [
                set(
                  sideWidth,
                  springToEnd({
                    from: sideWidth,
                    to: 0,
                  }),
                ),
              ],
              [
                set(
                  sideWidth,
                  springToEnd({
                    from: sideWidth,
                    to: screenWidth,
                  }),
                ),
              ],
            ),
            set(previousSideWidth, sideWidth),
          ]),
        ],
      ),
    ]);
  };

  const animateCurve = () => {
    return block([
      set(
        waveVertRadius,
        add(
          multiply(waveHorRadius, curveVeritcalHorizontalRate),
          multiply(sideWidth, curveVeritcalHorizontalRate),
        ),
      ),
    ]);
  };

  const animateCenter = () => {
    return block([
      cond(
        eq(state, State.ACTIVE),
        [set(waveCenterY, absoluteY)],
        [
          cond(eq(state, State.END), [
            cond(greaterOrEq(absoluteX, shouldTransitionBorderX), [
              cond(
                eq(waveCenterY, initialWaveCenterY),
                [],
                [
                  set(
                    waveCenterY,
                    springToEnd({
                      from: waveCenterY,
                      to: initialWaveCenterY,
                    }),
                  ),
                ],
              ),
            ]),
          ]),
        ],
      ),
    ]);
  };

  // const debug = () => {
  //   return block([call([sideWidth, velocityX], console.log)]);
  // };

  useCode(
    () =>
      block([
        animateCenter(),
        animateCurve(),
        animateWidth(),
        // debug(),
      ]),
    [],
  );

  return (
    <MaskedView
      style={[
        AppStyle.styleguide.fullScreen,
        AppStyle.styleguide.whiteBackground,
      ]}
      maskElement={
        <LiquidWave
          {...{
            waveCenterY,
            waveHorRadius,
            waveVertRadius,
            sideWidth,
          }}
          container={{
            width: screenWidth,
            height: screenHeight,
          }}
        />
      }>
      {children}
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            {
              width: waveHorRadius,
              height: multiply(waveVertRadius, 2),
              top: sub(waveCenterY, waveVertRadius),
              right: cond(
                eq(sideWidth, screenWidth),
                sub(sideWidth, waveHorRadius),
                sideWidth,
              ),
            },
            style.maskHandler,
          ]}></Animated.View>
      </PanGestureHandler>
    </MaskedView>
  );
}

LiquidWaveMask.propTypes = {};

export default LiquidWaveMask;
