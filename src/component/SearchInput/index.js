/**
 *
 * SearchInput
 *
 */

import { HookLib } from '@lib/index';
import { AppColor } from '@theme/index';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import style from './style';

function SearchInput({
  value,
  onChangeText,
  onFocus,
  onSubmitEditing,
  onBlur,
}) {
  const [borderColor, animateToBorderColor] = HookLib.useColorTransition([
    AppColor.inactive,
    AppColor.dark,
  ]);

  return (
    <Animated.View
      style={[
        style.container,
        {
          borderColor: borderColor,
        },
      ]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          animateToBorderColor(1);
          onFocus();
        }}
        onBlur={() => {
          animateToBorderColor(0);
          onBlur();
        }}
        onSubmitEditing={onSubmitEditing}
        keyboardType="default"
        autoCorrect={false}
        returnKeyType="search"
        returnKeyLabel="Search"
        style={style.textinput}
        placeholder="What are you looking for?"
        placeholderTextColor={AppColor.inactive}
      />
    </Animated.View>
  );
}

SearchInput.defaultProps = {
  onChangeText: () => {},
  onFocus: () => {},
  onSubmitEditing: () => {},
  onBlur: () => {},
};

export default SearchInput;
