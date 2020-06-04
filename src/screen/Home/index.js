/**
 *
 * HomeScreen Container
 *
 */

import { mockAction, sagaAction } from '@redux/home/action';
import getModule from '@redux/home/module';
import { selectCount as selectHomeCount } from '@redux/home/selector';
import React, { Component } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const homeIdentifier = 'home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>{this.props.numberHome}</Text>
        <LoginButton
          onLoginFinished={(err, status) => {
            console.log('err', err);
            console.log('status', status);
          }}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Go to List"
          onPress={() => this.props.navigation.navigate('ListItem')}
        />
        <Button
          title="Dispatch saga action"
          onPress={() => this.props.sagaAction()}
        />
        <Button
          title="increase count"
          onPress={() => this.props.mockAction()}
        />
      </View>
    );
  }
}

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

const mapStateToProps = createStructuredSelector({
  numberHome: selectHomeCount(),
});

const mapDispatchToProps = dispatch => ({
  sagaAction: () => dispatch(sagaAction()),
  mockAction: () => dispatch(mockAction()),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  getModule({ identifier: homeIdentifier }),
  withConnect,
)(HomeScreen);
