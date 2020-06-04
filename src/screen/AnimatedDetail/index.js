/**
 *
 * AnimatedDetail Container
 *
 */

import { AppConstants } from '@constant/index';
import { NavigationServiceLib, UtilLib } from '@lib/index';
import { AppColor, AppSize, AppStyle } from '@theme/index';
import React from 'react';
import { Image, Text, View } from 'react-native';
import {
  PanGestureHandler,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';
import {
  onGestureEvent,
  snapPoint,
  timing,
  useValues,
} from 'react-native-redash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SharedElement } from 'react-navigation-shared-element';
import { connect } from 'react-redux';
import { compose } from 'redux';
import style from './style';

const {
  useCode,
  Extrapolate,
  block,
  cond,
  eq,
  set,
  call,
  interpolate,
} = Animated;

function AnimatedDetail({ navigation }) {
  const item = navigation.getParam('item');
  const [
    translationX,
    translationY,
    velocityY,
    translateX,
    translateY,
    state,
  ] = useValues([0, 0, 0, 0, 0, State.UNDETERMINED], []);
  const gestureHandler = onGestureEvent({
    translationX,
    translationY,
    velocityY,
    state,
  });
  const scale = interpolate(translateY, {
    inputRange: [0, AppSize.screen.height / 2],
    outputRange: [1, 0.75],
    extrapolate: Extrapolate.CLAMP,
  });
  const snapped = snapPoint(translationY, velocityY, [
    0,
    AppSize.screen.height,
  ]);

  useCode(
    () =>
      block([
        cond(
          eq(state, State.END),
          cond(
            eq(snapped, AppSize.screen.height),
            call([], () => NavigationServiceLib.pop()),
            [
              set(
                translateY,
                timing({
                  from: translationY,
                  to: 0,
                  duration: 300,
                  easing: Easing.ease,
                }),
              ),
              set(
                translateX,
                timing({
                  from: translationX,
                  to: 0,
                  duration: 300,
                  easing: Easing.ease,
                }),
              ),
            ],
          ),
          [set(translateX, translationX), set(translateY, translationY)],
        ),
      ]),
    [],
  );

  return (
    <View style={[AppStyle.styleguide.flex1, AppStyle.styleguide.mediumShadow]}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            AppStyle.styleguide.flex1,
            AppStyle.styleguide.whiteBackground,
            {
              transform: [
                {
                  translateX: translateX,
                },
                {
                  translateY: translateY,
                },
                {
                  scale,
                },
              ],
            },
          ]}>
          <View style={[AppStyle.styleguide.flex1]}>
            <View>
              <SharedElement
                id={UtilLib.getAnimatedId(
                  AppConstants.sharedElementPrefixId.animatedItem,
                  item.id,
                )}>
                <Image
                  source={item.image}
                  style={[
                    {
                      height: style.image.height,
                      width: style.image.width,
                    },
                  ]}
                />
              </SharedElement>
              <View style={[AppStyle.styleguide.absoluteView]}>
                <TouchableOpacity onPress={() => NavigationServiceLib.pop()}>
                  <View style={[AppStyle.styleguide.pad10]}>
                    <Icon name="angle-left" size={40} color={AppColor.white} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                AppStyle.styleguide.padx15,
                AppStyle.styleguide.padTop15,
              ]}>
              <Text style={style.title}>{item.title}</Text>
              <Text style={style.description}>{item.description}</Text>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

AnimatedDetail.propTypes = {};

AnimatedDetail.defaultProps = {};

AnimatedDetail.sharedElements = (navigation, otherNavigation, showing) => {
  const item = navigation.getParam('item');
  return [
    {
      id: UtilLib.getAnimatedId(
        AppConstants.sharedElementPrefixId.animatedItem,
        item.id,
      ),
      animation: 'fade',
    },
  ];
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AnimatedDetail);
