/**
 *
 * DetailScreen Container
 *
 */

import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button title="Back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

DetailsScreen.propTypes = {};

DetailsScreen.defaultProps = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DetailsScreen);
