'use strict';

var React = require('react-native');
var moment = require('moment');
var Calendar = require('rn-calendars');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} = React;

var RNCalendar = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Calendar scrollEnabled={true}
                  startDate="2015-11-30" />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
});

AppRegistry.registerComponent('RNCalendar', () => RNCalendar);
