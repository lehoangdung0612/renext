/**
 *
 * AnimatedItem Component
 *
 */

import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { AppStyle, AppColor } from '@theme/index';
import { SharedElement } from 'react-navigation-shared-element';
import { NavigationServiceLib, UtilLib } from '@lib/index';
import { AppConstants } from '@constant/index';
import style from './style';

function AnimatedItem({ row }) {
  return (
    <TouchableOpacity
      onPress={() =>
        NavigationServiceLib.navigate('AnimatedDetail', { item: row })
      }>
      <View style={[style.container, AppStyle.styleguide.pad10]}>
        <View
          style={[
            AppStyle.styleguide.flex1,
            AppStyle.styleguide.columnFlex,
            AppStyle.styleguide.lowShadow,
          ]}>
          <View
            style={[
              AppStyle.styleguide.whiteBackground,
              AppStyle.styleguide.flex1,
              AppStyle.styleguide.middleContent,
            ]}>
            <SharedElement
              id={UtilLib.getAnimatedId(
                AppConstants.sharedElementPrefixId.animatedItem,
                row.id,
              )}>
              <Image
                source={row.image}
                style={[AppStyle.styleguide.flex1]}
                {...style.image}
                resizeMode="cover"
              />
            </SharedElement>
          </View>
          <View
            style={[
              AppStyle.styleguide.flex1,
              AppStyle.styleguide.pad10,
              AppStyle.styleguide.whiteBackground,
            ]}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={style.title}>
              {row.title}
            </Text>
            <View style={[AppStyle.styleguide.padTop5]}>
              <Text style={style.datetime}>
                {row.datetime.format('MMMM DD, YYYY')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

AnimatedItem.propTypes = {};

export default AnimatedItem;
