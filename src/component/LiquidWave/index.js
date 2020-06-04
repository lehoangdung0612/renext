/**
 *
 * LiquidWave
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import {
  moveTo,
  composeSvgHelper,
  lineTo,
  curveTo,
  closePath,
} from './svgHelper';
import { AppColor } from '@theme/index';
import { string } from 'react-native-redash';

const { sub, add, multiply } = Animated;

const AnimatedPath = Animated.createAnimatedComponent(Path);

function LiquidWave({
  waveCenterY,
  waveHorRadius,
  waveVertRadius,
  sideWidth,
  container: { width, height },
}) {
  let path = string``;
  const curveStartY = add(waveCenterY, waveVertRadius);
  const maskWidth = sub(width, sideWidth);
  path = composeSvgHelper(
    path,
    [
      moveTo,
      {
        x: sub(maskWidth, sideWidth),
        y: 0,
      },
    ],
    [
      lineTo,
      {
        x: 0,
        y: 0,
      },
    ],
    [
      lineTo,
      {
        x: 0,
        y: height,
      },
    ],
    [
      lineTo,
      {
        x: maskWidth,
        y: height,
      },
    ],
    [
      lineTo,
      {
        x: maskWidth,
        y: curveStartY,
      },
    ],
    [
      curveTo,
      {
        x1: maskWidth,
        y1: sub(curveStartY, multiply(waveVertRadius, 0.3322374268)),
        x2: sub(maskWidth, multiply(waveHorRadius, 0.05341339583)),
        y2: sub(curveStartY, multiply(waveVertRadius, 0.2412779634)),
        x: sub(maskWidth, multiply(waveHorRadius, 0.1561501458)),
        y: sub(curveStartY, multiply(waveVertRadius, 0.3322374268)),
      },
    ],
    [
      curveTo,
      {
        x: sub(maskWidth, multiply(waveHorRadius, 0.5012484792)),
        y: sub(curveStartY, multiply(waveVertRadius, 0.5350576951)),
        x1: sub(maskWidth, multiply(waveHorRadius, 0.2361659167)),
        y1: sub(curveStartY, multiply(waveVertRadius, 0.4030805244)),
        x2: sub(maskWidth, multiply(waveHorRadius, 0.3305285625)),
        y2: sub(curveStartY, multiply(waveVertRadius, 0.4561193293)),
      },
    ],
    [
      curveTo,
      {
        x: sub(maskWidth, multiply(waveHorRadius, 0.574934875)),
        y: sub(curveStartY, multiply(waveVertRadius, 0.5689655122)),
        x1: sub(maskWidth, multiply(waveHorRadius, 0.515878125)),
        y1: sub(curveStartY, multiply(waveVertRadius, 0.5418222317)),
        x2: sub(maskWidth, multiply(waveHorRadius, 0.5664134792)),
        y2: sub(curveStartY, multiply(waveVertRadius, 0.5650349878)),
      },
    ],
    [
      curveTo,
      {
        x: sub(maskWidth, multiply(waveHorRadius, 0.8774032292)),
        y: sub(curveStartY, multiply(waveVertRadius, 0.7399037439)),
        x1: sub(maskWidth, multiply(waveHorRadius, 0.7283715208)),
        y1: sub(curveStartY, multiply(waveVertRadius, 0.6397387195)),
        x2: sub(maskWidth, multiply(waveHorRadius, 0.8086618958)),
        y2: sub(curveStartY, multiply(waveVertRadius, 0.6833456585)),
      },
    ],
    [
      curveTo,
      {
        x: sub(maskWidth, waveHorRadius),
        y: sub(curveStartY, waveVertRadius),
        x1: sub(maskWidth, multiply(waveHorRadius, 0.9653464583)),
        y1: sub(curveStartY, multiply(waveVertRadius, 0.8122605122)),
        x2: sub(maskWidth, waveHorRadius),
        y2: sub(curveStartY, multiply(waveVertRadius, 0.8936183659)),
      },
    ],
    [
      curveTo,
      {
        x: sub(maskWidth, multiply(waveHorRadius, 0.8608411667)),
        y: sub(curveStartY, multiply(waveVertRadius, 1.270484439)),
        x1: sub(maskWidth, waveHorRadius),
        y1: sub(curveStartY, multiply(waveVertRadius, 1.100142878)),
        x2: sub(maskWidth, multiply(waveHorRadius, 0.9595746667)),
        y2: sub(curveStartY, multiply(waveVertRadius, 1.1887991951)),
      },
    ],
    [
      curveTo,
      {
        x: sub(maskWidth, multiply(waveHorRadius, 0.5291125625)),
        y: sub(curveStartY, multiply(waveVertRadius, 1.4665102805)),
        x1: sub(maskWidth, multiply(waveHorRadius, 0.7852123333)),
        y1: sub(curveStartY, multiply(waveVertRadius, 1.3330544756)),
        x2: sub(maskWidth, multiply(waveHorRadius, 0.703382125)),
        y2: sub(curveStartY, multiply(waveVertRadius, 1.3795848049)),
      },
    ],
    [
      curveTo,
      {
        x: sub(maskWidth, multiply(waveHorRadius, 0.5015305417)),
        y: sub(curveStartY, multiply(waveVertRadius, 1.4802616098)),
        x1: sub(maskWidth, multiply(waveHorRadius, 0.5241858333)),
        y1: sub(curveStartY, multiply(waveVertRadius, 1.4689677195)),
        x2: sub(maskWidth, multiply(waveHorRadius, 0.505739125)),
        y2: sub(curveStartY, multiply(waveVertRadius, 1.4781625854)),
      },
    ],
    [
      curveTo,
      {
        x: sub(maskWidth, multiply(waveHorRadius, 0.1541165417)),
        y: sub(curveStartY, multiply(waveVertRadius, 1.687403)),
        x1: sub(maskWidth, multiply(waveHorRadius, 0.3187486042)),
        y1: sub(curveStartY, multiply(waveVertRadius, 1.5714239024)),
        x2: sub(maskWidth, multiply(waveHorRadius, 0.2332057083)),
        y2: sub(curveStartY, multiply(waveVertRadius, 1.6204116463)),
      },
    ],
    [
      curveTo,
      {
        x: maskWidth,
        y: sub(curveStartY, multiply(waveVertRadius, 2)),
        x1: sub(maskWidth, multiply(waveHorRadius, 0.0509933125)),
        y1: sub(curveStartY, multiply(waveVertRadius, 1.774752061)),
        x2: maskWidth,
        y2: sub(curveStartY, multiply(waveVertRadius, 1.8709256829)),
      },
    ],
    [
      lineTo,
      {
        x: maskWidth,
        y: 0,
      },
    ],
    [closePath],
  );

  return (
    <Svg height={height} width={width}>
      <AnimatedPath
        d={path}
        stroke={AppColor.primary.regular}
        fill={AppColor.primary.regular}
      />
    </Svg>
  );
}

LiquidWave.propTypes = {
  waveCenterY: PropTypes.instanceOf(Animated.Value),
  waveHorRadius: PropTypes.instanceOf(Animated.Value),
  waveVertRadius: PropTypes.instanceOf(Animated.Value),
  sideWidth: PropTypes.instanceOf(Animated.Value),
  state: PropTypes.instanceOf(Animated.Value),
};

export default LiquidWave;
