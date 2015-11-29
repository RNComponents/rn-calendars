var React = require('react-native');

module.exports = React.StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },

  header: {
    flex: 1,
    height: 36,
    paddingHorizontal: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(237, 237, 237)'
  },

  nav: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },

  arrow: {
    borderLeftWidth: 2,
    borderTopWidth: 2,
    width: 10,
    height: 10,
    borderColor: 'rgb(188,193,199)'
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
    flexDirection: 'row',
    backgroundColor: 'rgb(162, 172, 181)'
  },

  headingUnit: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 5,
    color: 'white'
  },

  weekWrapper: {
    flexDirection: 'row'
  },

  dayWrapper: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  day: {
    textAlign: 'center'
  }

});
