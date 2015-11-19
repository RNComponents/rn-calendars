'use strict';

var React = require('react-native');
var Calendar = require('../index');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var RNCalendar = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Calendar />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('RNCalendar', () => RNCalendar);
