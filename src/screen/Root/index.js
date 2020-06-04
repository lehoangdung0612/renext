/**
 *
 * Root Container
 *
 */

import { AppStyle } from '@theme/index';
import React from 'react';
import { View } from 'react-native';
import SideMenu from '@component/SideMenu/index';

class Root extends React.Component {
  render() {
    return (
      <SideMenu>
        <View style={[AppStyle.styleguide.flex1]}>{this.props.children}</View>
      </SideMenu>
    );
  }
}

export default Root;
