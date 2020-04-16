/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { TransitionLib } from '@lib/index';
import AnimatedDetail from '@screen/AnimatedDetail/index';
import ListItem from '@screen/ListItem/index';
import { AppColor } from '@theme/index';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const sharedNavigator = createSharedElementStackNavigator(
  {
    Home: ListItem,
    AnimatedDetail: {
      screen: AnimatedDetail,
      navigationOptions: {
        containerStyle: {
          backgroundColor: AppColor.shadow,
        },
        cardStyle: {
          backgroundColor: AppColor.dim,
        },
      },
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    defaultNavigationOptions: {
      cardStyleInterpolator: TransitionLib.screenFadeIn,
      gestureEnabled: false,
    },
  },
);

const liquidNavigator = createSharedElementStackNavigator(
  {
    Home: ListItem,
    AnimatedDetail: {
      screen: AnimatedDetail,
      navigationOptions: {
        containerStyle: {
          backgroundColor: AppColor.shadow,
        },
        cardStyle: {
          backgroundColor: AppColor.dim,
        },
      },
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    defaultNavigationOptions: {
      cardStyleInterpolator: TransitionLib.screenFadeIn,
      gestureEnabled: false,
    },
  },
);

const AppNavigator = createDrawerNavigator(
  {
    shared: sharedNavigator,
    liquid: liquidNavigator,
  },
  {
    initialRouteName: 'shared',
    headerMode: 'none',
    backBehavior: 'none',
    drawerType: 'back',
    drawerPosition: 'left',
    defaultNavigationOptions: {
      drawerLockMode: 'locked-closed',
    },
  },
);

export default createAppContainer(AppNavigator);
