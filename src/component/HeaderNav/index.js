/**
 *
 * HeaderNav
 *
 */

import Condition from '@component/Condition/index';
import SearchInput from '@component/SearchInput/index';
import { AppStyle } from '@theme/index';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import style from './style';
// import PropTypes from 'prop-types';

function HeaderNav({
  title,
  isWhite,
  onPress,
  useSearch,
  onChangeSearch,
  onSearch,
  searchText,
}) {
  const headerColor = isWhite ? style.headerColorWhite : style.headerColorFill;
  const headerTitleColor = isWhite
    ? style.titleColorWhite
    : style.titleColorFill;
  return (
    <View
      style={[
        headerColor,
        style.container,
        AppStyle.styleguide.mediumShadow,
        useSearch && style.useSearchContainerHeight,
      ]}>
      <View style={[style.defaultHeaderNav]}>
        <View style={[AppStyle.styleguide.padRight15]}>
          <TouchableOpacity
            hitSlop={AppStyle.styleguide.iconButtonHitSlop}
            onPress={onPress}>
            <SIcon name="menu" size={25} color={headerTitleColor.color} />
          </TouchableOpacity>
        </View>
        <Text style={[style.title, headerTitleColor]}>{title}</Text>
      </View>
      <Condition display={useSearch}>
        <View style={[style.serachBarContainer]}>
          <SearchInput value={searchText} onChangeText={onChangeSearch} />
        </View>
      </Condition>
      <View />
    </View>
  );
}

HeaderNav.propTypes = {};

export default HeaderNav;
