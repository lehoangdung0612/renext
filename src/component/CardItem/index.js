/**
 *
 * CardItem
 *
 */

import React from 'react';
import { Text, View, Image } from 'react-native';
import { AppStyle } from '@theme/index';
import style from './style';
// import PropTypes from 'prop-types';

function CardItem({ title, image, description, style: containerStyle }) {
  return (
    <View style={[containerStyle]}>
      <View style={[AppStyle.styleguide.flex6]}>
        <Image source={{ uri: image }} style={[AppStyle.styleguide.flex1]} />
      </View>
      <View style={[AppStyle.styleguide.flex4]}>
        <Text style={style.title}>{title}</Text>
      </View>
    </View>
  );
}

CardItem.propTypes = {};

export default CardItem;
