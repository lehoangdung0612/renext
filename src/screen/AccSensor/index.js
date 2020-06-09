/**
 *
 * Liquid
 *
 */

import { AppStyle } from '@theme/index';
import React from 'react';
import {
  View,
  Button,
  TextInput,
  Alert,
  Animated,
  TouchableOpacity,
} from 'react-native';
import ModelView from 'react-native-gl-model-view';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { BluetoothLib, UtilLib, PermissionLib } from '@lib/index';
import style from './style';

const AnimatedModelView = Animated.createAnimatedComponent(ModelView);

class AccSensor extends React.Component {
  constructor() {
    super();
    this.animatedValue = {};
    this.state = {
      actionName: 'Start',
      macAddress: 'AC:23:3F:A2:AD:75',
      xAxis: new Animated.Value(0),
      yAxis: new Animated.Value(0),
      rotateX: new Animated.Value(0),
      rotateY: new Animated.Value(180),
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(-20),
      translateZ: new Animated.Value(-40),
      fromXY: new Animated.ValueXY(),
      valueXY: new Animated.ValueXY(),
    };
    Object.keys(this.state).forEach(key => {
      if (this.state[key] instanceof Animated.Value) {
        this.state[key].__makeNative();
      }
    });
  }

  componentDidMount() {
    this.requestLocationPermission();
    BluetoothLib.setOnStateChange(state => {
      if (state === BluetoothLib.State.PoweredOff) {
        this.stopScan();
      }
    });
    Object.keys(this.state).forEach(key => {
      if (this.state[key] instanceof Animated.Value) {
        this.state[key].addListener(v => {
          this.animatedValue[key] = v.value;
        });
      }
    });
  }

  componentWillUnMount() {
    this.stopScan();
    Object.keys(this.state).forEach(key => {
      if (this.state[key] instanceof Animated.Value) {
        this.state[key].removeAllListeners();
      }
    });
  }

  requestLocationPermission = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await PermissionLib.alertEnableLocationAndroid();
        const state = await PermissionLib.requestLocationPermissionAlways();
        if (PermissionLib.isGranted(state)) {
          return resolve();
        }
        return reject();
      } catch (error) {
        if (__DEV__) {
          console.log(error);
        }
        return reject();
      }
    });
  };

  startScan = async () => {
    if (!BluetoothLib.isScanning()) {
      await PermissionLib.requestBluetoothPermission();
    }
    await this.requestLocationPermission();
    BluetoothLib.activeScan(this.scanHandler);
    this.setState({ actionName: 'Stop' });
  };

  stopScan = () => {
    BluetoothLib.abortScan();
    this.setState({ actionName: 'Start' });
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
    const macAddress = UtilLib.formatMacAddress(this.state.macAddress);
    if (!macAddress) {
      Alert.alert('Invalid mac address', 'Please try again', [{ text: 'OK' }], {
        cancelable: true,
      });
      return;
    }
    BluetoothLib.getState().then(blState => {
      if (blState === BluetoothLib.State.PoweredOn) {
        if (this.state.actionName === 'Start') {
          this.startScan();
        } else {
          this.stopScan();
        }
      }
    });
  };

  setValue = (value, toValue) =>
    Animated.spring(value, {
      toValue,
      tension: 10,
      friction: 10,
      velocity: 0,
      useNativeDriver: true,
      // stiffness: 0,
      // damping: 0,
      // overshootClamping: true,
      // restDisplacementThreshold: 0,
      // restSpeedThreshold: 0,
    });

  animate = (aX, aY, aZ) => {
    let { xAxis, yAxis } = this.state;
    // this.setState({
    //   xAxis: aX,
    //   yAxis: aY,
    // });
    let xDeg = Math.round((Math.asin(aX) * 180) / Math.PI);
    let yDeg = Math.round((Math.asin(aY) * 180) / Math.PI);
    if (aZ < 0) {
      yDeg = 180 - yDeg;
    } else if (yDeg < 0 && this.animatedValue.yAxis >= 180) {
      yDeg = 360 - Math.abs(yDeg);
    }
    Animated.parallel([
      this.setValue(xAxis, xDeg),
      this.setValue(yAxis, yDeg),
    ]).start();
  };

  translateX = level => {
    let { translateX } = this.state;
    this.setValue(translateX, this.animatedValue.translateX + level).start();
  };

  translateY = level => {
    let { translateY } = this.state;
    this.setValue(translateY, this.animatedValue.translateY + level).start();
  };

  translateZ = level => {
    let { translateZ } = this.state;
    this.setValue(translateZ, this.animatedValue.translateZ + level).start();
  };

  onMoveEnd = () => {
    this.state.fromXY.setValue({ x: 0, y: 0 });
  };

  onMove = e => {
    let { pageX, pageY } = e.nativeEvent,
      { rotateX, rotateY, fromXY, valueXY } = this.state;
    if (!fromXY.__getValue().x && !fromXY.__getValue().y) {
      fromXY.setValue({ x: pageX, y: pageY });
      valueXY.setValue({ x: rotateY.__getValue(), y: rotateX.__getValue() });
    } else {
      rotateY.setValue(
        valueXY.__getValue().x + (pageX - fromXY.__getValue().x) / 2,
      );
      rotateX.setValue(
        valueXY.__getValue().y + (pageY - fromXY.__getValue().y) / 2,
      );
    }
  };

  renderModel = () => {
    const {
      xAxis,
      yAxis,
      rotateY,
      translateX,
      translateY,
      translateZ,
    } = this.state;

    return (
      <AnimatedModelView
        model={{
          uri: 'car.obj',
        }}
        texture={{
          uri: 'demon.png',
        }}
        scale={0.01}
        translateX={translateX}
        translateY={translateY}
        translateZ={translateZ}
        rotateX={xAxis}
        rotateY={rotateY}
        rotateZ={yAxis}
        style={AppStyle.styleguide.flex1}
        onStartShouldSetResponder={() => true}
        onResponderRelease={this.onMoveEnd}
        onResponderMove={this.onMove}
      />
    );
  };

  renderCameraControl = () => {
    return (
      <View
        style={[
          AppStyle.styleguide.flexEndContent,
          AppStyle.styleguide.alignContent,
          AppStyle.styleguide.rowFlex,
          AppStyle.styleguide.pad15,
          AppStyle.styleguide.marginBottom20,
        ]}>
        <View style={[AppStyle.styleguide.flex1]}>
          <TouchableOpacity
            onPress={() => {
              this.translateX(-2);
            }}
            style={[
              AppStyle.styleguide.marginHor8,
              AppStyle.styleguide.middleContent,
              style.touchIcon,
            ]}>
            <MIcon name="keyboard-arrow-left" size={40} />
          </TouchableOpacity>
        </View>
        <View style={[AppStyle.styleguide.flex1]}>
          <TouchableOpacity
            onPress={() => {
              this.translateX(2);
            }}
            style={[
              AppStyle.styleguide.marginHor8,
              AppStyle.styleguide.middleContent,
              style.touchIcon,
            ]}>
            <MIcon name="keyboard-arrow-right" size={40} />
          </TouchableOpacity>
        </View>
        <View style={[AppStyle.styleguide.flex1]}>
          <TouchableOpacity
            onPress={() => {
              this.translateY(2);
            }}
            style={[
              AppStyle.styleguide.marginHor8,
              AppStyle.styleguide.middleContent,
              style.touchIcon,
            ]}>
            <MIcon name="keyboard-arrow-up" size={40} />
          </TouchableOpacity>
        </View>
        <View style={[AppStyle.styleguide.flex1]}>
          <TouchableOpacity
            onPress={() => {
              this.translateY(-2);
            }}
            style={[
              AppStyle.styleguide.marginHor8,
              AppStyle.styleguide.middleContent,
              style.touchIcon,
            ]}>
            <MIcon name="keyboard-arrow-down" size={40} />
          </TouchableOpacity>
        </View>
        <View style={[AppStyle.styleguide.flex1]}>
          <TouchableOpacity
            onPress={() => {
              this.translateZ(2);
            }}
            style={[
              AppStyle.styleguide.marginHor8,
              AppStyle.styleguide.middleContent,
              style.touchIcon,
            ]}>
            <MIcon name="zoom-in" size={40} />
          </TouchableOpacity>
        </View>
        <View style={[AppStyle.styleguide.flex1]}>
          <TouchableOpacity
            onPress={() => {
              this.translateZ(-2);
            }}
            style={[
              AppStyle.styleguide.marginHor8,
              AppStyle.styleguide.middleContent,
              style.touchIcon,
            ]}>
            <MIcon name="zoom-out" size={40} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderForm = () => {
    const { actionName, macAddress } = this.state;
    const disableInput = actionName === 'Stop';
    return (
      <View
        style={[
          AppStyle.styleguide.flexEndContent,
          AppStyle.styleguide.alignContent,
          AppStyle.styleguide.rowFlex,
          AppStyle.styleguide.pad15,
          AppStyle.styleguide.marginBottom20,
        ]}>
        <View
          style={[AppStyle.styleguide.flex3, AppStyle.styleguide.padRight15]}>
          <TextInput
            style={[style.textInput, disableInput ? style.disabledInput : {}]}
            editable={!disableInput}
            selectTextOnFocus={!disableInput}
            autoCorrect={false}
            keyboardType="default"
            placeholder="Input your mac address"
            ref={ref => {
              this.input = ref;
            }}
            value={macAddress}
            onChangeText={text => {
              this.setState({
                macAddress: text,
              });
            }}
          />
        </View>
        <View style={AppStyle.styleguide.flex1}>
          <Button
            style={AppStyle.styleguide.justifyContent}
            onPress={this.onPressHandler}
            title={actionName}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View
        style={[
          AppStyle.styleguide.flex1,
          AppStyle.styleguide.fullScreen,
          AppStyle.styleguide.whiteBackground,
        ]}>
        {this.renderModel()}
        {this.renderCameraControl()}
        {this.renderForm()}
      </View>
    );
  }
}

AccSensor.propTypes = {};

export default AccSensor;
