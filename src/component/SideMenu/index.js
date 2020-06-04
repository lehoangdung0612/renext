/**
 *
 * SideMenu
 *
 */

import { MenuProvider, useMenu } from '@context/index';
import { AppColor, AppSize, AppStyle } from '@theme/index';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import style from './style';

const { interpolate, Extrapolate } = Animated;

function SideMenu({ children }) {
  const menu = useMenu();
  const scale = interpolate(menu.toggleProgress, {
    inputRange: [0, 1],
    outputRange: [1, 0.6],
    extrapolate: Extrapolate.CLAMP,
  });
  const translateX = interpolate(menu.toggleProgress, {
    inputRange: [0, 1],
    outputRange: [1, AppSize.screen.width - 200],
    extrapolate: Extrapolate.CLAMP,
  });
  const overlayScale = interpolate(menu.toggleProgress, {
    inputRange: [0, 1],
    outputRange: [Math.PI / 2, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <MenuProvider>
      <View style={[AppStyle.styleguide.flex1]}>
        <View style={[style.container]}>
          <LinearGradient
            style={[AppStyle.styleguide.flex1]}
            colors={[AppColor.secondary.regular, AppColor.secondary.light]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          />
        </View>
        <Animated.View
          style={[
            AppStyle.styleguide.flex1,
            {
              transform: [{ translateX }, { scale }],
            },
          ]}>
          {children}
          <TouchableWithoutFeedback onPress={menu.closeMenu}>
            <Animated.View
              blurRadius={10}
              style={[
                AppStyle.styleguide.absoluteView,
                AppStyle.styleguide.fullScreen,
                style.overlay,
                {
                  transform: [
                    {
                      rotateX: overlayScale,
                    },
                  ],
                },
              ]}></Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    </MenuProvider>
  );
}

SideMenu.propTypes = {};

export default SideMenu;
