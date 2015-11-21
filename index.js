'use strict';

// Module dependencies
let React = require('react-native');
let moment = require('moment');
let PropTypes = React.PropTypes;

let styles = require('./style');

let {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} = React;

let ROW = 7;
let COLUMN = 7;
let VIEW_INDEX = 2;

let EmptyDay = React.createClass({
  render () {
    return (
      <Text style={styles.dayWrapper} />
    );
  }
});

let Calendar = React.createClass({

  propTypes: {
    data: PropTypes.array,
    scrollEnabled: PropTypes.bool,
    startDate: PropTypes.string,
    headings: PropTypes.array,
    renderDay: PropTypes.func
  },

  getDefaultProps () {
    return {
      data: [],
      scrollEnabled: false,
      startDate: moment().format('YYYY-MM-DD'),
      headings: ['日', '一', '二', '三', '四', '五', '六'],
      renderDay (newDay, isToday) {
        return (
          <TouchableOpacity style={styles.dayWrapper} onPress={()=>{console.log(moment(newDay).format('YYYY-MM-DD'))}}>
            {isToday ?
              <Text style={styles.day}>Today</Text>:
              <Text style={styles.day}>{moment(newDay).date()}</Text>
            }
          </TouchableOpacity>
        );
      }
    }
  },

  getInitialState () {
    return {
      currentDate: moment().format('YYYY-MM-DD'),
      calendarDate: this.getInitialStack()
    }
  },

  componentWillMount () {
    this.renderedMonths = [];
  },

  componentDidMount () {

  },

  getInitialStack () {
    var initialStack = [];

    if (this.props.scrollEnabled) {
      initialStack.push(moment(this.props.startDate).subtract(2, 'month').format());
      initialStack.push(moment(this.props.startDate).subtract(1, 'month').format());
      initialStack.push(moment(this.props.startDate).format());
      initialStack.push(moment(this.props.startDate).add(1, 'month').format());
      initialStack.push(moment(this.props.startDate).add(2, 'month').format());
    } else {
      initialStack.push(moment(this.props.startDate).format())
    }

    return initialStack;
  },

  render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._renderHeading()}
        {this.props.scrollEnabled ?
          <ScrollView>

          </ScrollView> :
          <View>
            {this.state.calendarDate.map((date)=>this._renderMonth(date))}
          </View>
        }
      </View>
    );
  },

  _renderHeader () {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={this._onPrev}>
          <View style={[styles.arrow, styles.left]} />
        </TouchableOpacity>
        <Text style={styles.title}>{moment(this.state.currentDate).format('MMM YYYY')}</Text>
        <TouchableOpacity onPress={this._onNext}>
          <View style={[styles.arrow, styles.right]} />
        </TouchableOpacity>
      </View>
    );
  },

  _renderHeading () {
    return (
      <View style={styles.heading}>
        {this.props.headings.map((heading, index)=>
          <Text key={index} style={styles.headingUnit}>{heading}</Text>
        )}
      </View>
    );
  },

  _renderMonth (date) {
    // 当前月
    if (moment(this.state.currentDate).isSame(date, 'month')) {
      return this._renderMonthView(date);
    } else {
      let renderedMonth = null;

      for (let i = 0; i < this.renderedMonths.length; i++) {
        if (moment(this.renderedMonths[i][0]).isSame(date, 'month')) {
          renderedMonth = this.renderedMonths[i][1];
        }
      }

      if (!renderedMonth) { renderedMonth = this._renderMonthView(date); }

      return renderedMonth;
    }
  },

  _renderMonthView (date) {
    let dayStart = moment(date).startOf('month').format();
    let daysInMonth = moment(dayStart).daysInMonth();
    let dayStartOffset = moment(dayStart).get('day');
    let dayNum = 0;
    let preFiller = 0;
    let weeks = [];

    for (let row = 0; row < ROW; row++) {
      let days = [];
      for (let column = 0; column < COLUMN; column++) {
        if (preFiller < dayStartOffset) {
          days.push(<EmptyDay key={`${row},${column}`} />);
        } else {
          // 本月内的日子
          if (dayNum < daysInMonth) {
            let newDay = moment(dayStart).set('date', dayNum + 1);
            let isToday = moment().isSame(newDay, 'month') && moment().isSame(newDay, 'day');

            days.push(this.props.renderDay(newDay, isToday));
            dayNum++;
          }
        }
        preFiller++;
      }

      if(days.length > 0 && days.length < 7) {
        for (var x = days.length; x < 7; x++) {
          days.push(<EmptyDay key={`${row},${x+1}`} />);
        }
      }

      weeks.push(<View style={{flexDirection:'row'}}>{days}</View>);
    }

    return (<View>{weeks}</View>);

  },

  _onPrev () {

  },

  _onNext () {

  }

});

module.exports = Calendar;
