var React = require('react-native');

module.exports = React.StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },

  header: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  arrow: {
    borderLeftWidth: 2,
    borderTopWidth: 2,
    width: 14,
    height: 14,
    borderColor: '#333'
  },

  left: {
    transform: [
      {
        rotate: '-45deg'
      }
    ]
  },

  right: {
    transform: [
      {
        rotate: '135deg'
      }
    ]
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14
  },

  heading: {
    flexDirection: 'row'
  },

  headingUnit: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 5
  },

  dayWrapper: {
    flex: 1,
    paddingVertical: 10
  },

  day: {
    textAlign: 'center'
  }

});