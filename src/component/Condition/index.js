/**
 *
 * Condition
 *
 */

import React from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';

function Condition({ display, children }) {
  if (display) {
    return children;
  }
  return <View />;
}

Condition.propTypes = {};

export default Condition;
