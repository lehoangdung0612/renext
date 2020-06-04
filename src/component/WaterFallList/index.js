/**
 *
 * WaterFallList
 *
 */

import { AppStyle } from '@theme/index';
import React from 'react';
import { View } from 'react-native';
import { WaterfallList as RNWaterfallList } from 'react-native-largelist-v3';
import { NormalFooter } from 'react-native-spring-scrollview/NormalFooter';
import { NormalHeader } from 'react-native-spring-scrollview/NormalHeader';

function WaterFallList({
  data,
  itemWidth,
  itemHeight,
  renderItem,
  onRefresh,
  isAllLoaded,
  onLoadMore,
  ref,
}) {
  return (
    <View style={[AppStyle.styleguide.flex1]}>
      <RNWaterfallList
        ref={ref}
        style={[AppStyle.styleguide.flex1]}
        data={data}
        heightForItem={() => itemHeight}
        preferColumnWidth={itemWidth}
        numColumns={2}
        renderItem={renderItem}
        refreshHeader={NormalHeader}
        onRefresh={onRefresh}
        loadingFooter={NormalFooter}
        allLoaded={isAllLoaded}
        onLoading={onLoadMore}
      />
    </View>
  );
}

WaterFallList.propTypes = {};

export default React.forwardRef((props, ref) =>
  WaterFallList({ ...props, ref }),
);
