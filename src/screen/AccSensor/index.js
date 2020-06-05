/**
 *
 * Liquid
 *
 */

import { AppStyle } from '@theme/index';
import React, { useRef, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import ModelView from 'react-native-gl-model-view';
import { Animated, Easing } from 'react-native';
import BluetoothLib from '@lib/bluetooth';

const AnimatedModelView = Animated.createAnimatedComponent(ModelView);

function AccSensor() {
  const xAxis = useRef(new Animated.Value(0)).current;
  const yAxis = useRef(new Animated.Value(0)).current;
  const zAxis = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    BluetoothLib.activeScan(listDevices => {
      const sensors = listDevices.filter(
        item => item.mac === 'AC:23:3F:A2:AD:76',
      );
      if (sensors.length && sensors[0].accSensor) {
        const newX = Math.round((sensors[0].accSensor.xAxis * 180) / Math.PI);
        const newY = Math.round((sensors[0].accSensor.yAxis * 180) / Math.PI);
        const newZ = Math.round((sensors[0].accSensor.zAxis * 180) / Math.PI);
        if (xAxis !== newX || yAxis !== newY || zAxis !== newZ) {
          goCrazy(newX, newY, newZ);
        }
      }
    });
  });

  const crazy = (value, toValue) =>
    // Animated.spring(value, {
    //   toValue,
    //   bounciness: 8,
    //   speed: 12,
    // });
    Animated.timing(value, {
      toValue,
      useNativeDriver: true,
      duration: 1000,
      easing: Easing.elastic(4),
    });

  const goCrazy = (newX, newY, newZ) => {
    Animated.parallel([
      crazy(xAxis, newX),
      crazy(yAxis, newY),
      crazy(zAxis, newZ),
    ]).start();
  };

  const renderStaticModel = () => {
    return (
      <AnimatedModelView
        model={{
          uri: 'anonymous.obj',
        }}
        texture={{
          uri: 'anonymous.png',
        }}
        scale={0.2}
        translateZ={-2.5}
        rotateX={xAxis}
        rotateY={yAxis}
        rotateZ={zAxis}
        animate
        style={AppStyle.styleguide.flex1}
        onStartShouldSetResponder={() => true}
        // onResponderMove={this.onMove}
      />
    );
  };
  return (
    <ScrollView style={[AppStyle.styleguide.flex1]}>
      <View style={[AppStyle.styleguide.flex1, AppStyle.styleguide.fullScreen]}>
        {renderStaticModel()}
      </View>
    </ScrollView>
  );
}

AccSensor.propTypes = {};

export default AccSensor;
