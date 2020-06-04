/**
 *
 * Liquid
 *
 */

import LiquidWaveMask from '@component/LiquidWaveMask/index';
import { AppStyle } from '@theme/index';
import React from 'react';
import { View, Button } from 'react-native';
// import PropTypes from 'prop-types';

function Liquid() {
  return (
    <View
      style={[AppStyle.styleguide.flex1, AppStyle.styleguide.whiteBackground]}>
      <LiquidWaveMask>
        <View
          style={[
            AppStyle.styleguide.fullScreen,
            AppStyle.styleguide.primaryBackgroundLight,
            AppStyle.styleguide.middleContent,
          ]}>
          <Button title="press me" />
        </View>
      </LiquidWaveMask>
    </View>
  );
}

Liquid.propTypes = {};

export default Liquid;
