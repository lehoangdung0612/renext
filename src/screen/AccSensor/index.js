/**
 *
 * Liquid
 *
 */

import { AppStyle } from '@theme/index';
import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, Button, Text } from 'react-native';
import ModelView from 'react-native-gl-model-view';
import { Animated, Easing } from 'react-native';
import BluetoothLib from '@lib/bluetooth';

const AnimatedModelView = Animated.createAnimatedComponent(ModelView);

class AccSensor extends React.Component {
  constructor() {
    super();
    this.state = {
      actionName: 'Start',
      macAddress: 'AC:23:3F:A2:AD:76',
      xAxis: new Animated.Value(0),
      yAxis: new Animated.Value(0),
      zAxis: new Animated.Value(0),
    };
    Object.keys(this.state).forEach(key => {
      if (this.state[key] instanceof Animated.Value) {
        this.state[key].__makeNative();
      }
    });
  }

  componentDidMount() {
    this.onPressHandler();

    BluetoothLib.setOnStateChange(state => {
      if (state === BluetoothLib.State.PoweredOff) {
        this.stopScan();
      }
    });
  }

  componentWillUnMount() {
    this.stopScan();
  }

  setValue = (value, toValue) =>
    Animated.spring(value, {
      toValue,
      tension: 10,
      friction: 10,
      velocity: 0,
      // stiffness: 0,
      // damping: 0,
      // overshootClamping: true,
      // restDisplacementThreshold: 0,
      // restSpeedThreshold: 0,
      useNativeDriver: true,
    });

  animate = (aX, aY, aZ) => {
    let { xAxis, yAxis, zAxis } = this.state;

    // this.setState({
    //   xAxis: aX,
    //   yAxis: aY,
    //   zAxis: aZ,
    // });

    const xDeg = Math.round((Math.asin(aX) * 180) / Math.PI);
    const yDeg = Math.round((Math.asin(aY) * 180) / Math.PI);
    const zDeg = Math.round((Math.asin(aZ) * 180) / Math.PI);

    Animated.parallel([
      this.setValue(xAxis, xDeg),
      this.setValue(yAxis, yDeg),
      this.setValue(zAxis, zDeg),
    ]).start();
  };

  startScan = () => {
    BluetoothLib.activeScan(this.scanHandler);
  };

  stopScan = () => {
    BluetoothLib.abortScan();
  };

  scanHandler = listDevices => {
    const macAddress = this.state.macAddress;
    const sensors = listDevices.filter(item => item.mac === macAddress)[0];
    if (sensors && sensors.accSensor) {
      const accSensor = sensors.accSensor;
      const newX = Math.min(1, Math.max(-1, accSensor.xAxis));
      const newY = Math.min(1, Math.max(-1, accSensor.yAxis));
      const newZ = Math.min(1, Math.max(-1, accSensor.zAxis));
      this.animate(newX, newY, newZ);
    }
  };

  onPressHandler = () => {
    BluetoothLib.getState().then(blState => {
      if (blState === BluetoothLib.State.PoweredOn) {
        if (this.state.actionName === 'Start') {
          this.startScan();
          this.setState({ actionName: 'Stop' });
        } else {
          this.stopScan();
          this.setState({ actionName: 'Start' });
        }
      }
    });
  };

  renderModel = () => {
    const { xAxis, yAxis, zAxis } = this.state;
    // const xExtra = zAxis < 0 ? 180 : 0;
    // const yExtra = zAxis < 0 ? 180 : 0;
    // const zExtra = xAxis > 0 || yAxis > 0 ? 180 : 0;
    // const xDeg = Math.round((Math.asin(xAxis) * 180) / Math.PI);
    // const yDeg = Math.round((Math.asin(yAxis) * 180) / Math.PI);
    // const zDeg = Math.round((Math.asin(zAxis) * 180) / Math.PI);
    return (
      <AnimatedModelView
        model={{
          uri: 'demon.obj',
        }}
        texture={{
          uri: 'demon.png',
        }}
        scale={0.01}
        translateZ={-2.5}
        rotateX={xAxis}
        rotateY={yAxis}
        rotateZ={0}
        animate
        style={AppStyle.styleguide.flex1}
        onStartShouldSetResponder={() => true}
      />
    );
  };

  render() {
    const { actionName, macAddress } = this.state;
    return (
      <View style={[AppStyle.styleguide.flex1, AppStyle.styleguide.fullScreen]}>
        {this.renderModel()}
        <View style={[AppStyle.styleguide.flexEndContent]}>
          <Button
            style={AppStyle.styleguide.justifyContent}
            onPress={this.onPressHandler}
            title={actionName}
          />
        </View>
      </View>
    );
  }
}

AccSensor.propTypes = {};

export default AccSensor;
