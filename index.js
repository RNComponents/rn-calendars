'use strict';

// Module dependencies
let React = require('react-native');
let moment = require('moment');
let PropTypes = React.PropTypes;

let styles = require('./style');

let {
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity
  } = React;

let ROW = 7;
let COLUMN = 7;
let VIEW_INDEX = 2;
let DEVICE_WIDTH = Dimensions.get('window').width;

let EmptyDay = React.createClass({
  render () {
    return (
      <Text style={styles.dayWrapper} />
    );
  }
});

let Day = React.createClass({
  getDefaultProps () {
    return {
      date: moment().format('YYYY-MM-DD'),
      isSelected: false,
      onSelected: function (date) {
        console.log(moment(date).format('YYYY-MM-DD'));
      }
    }
  },

  render () {
    let customStyle = this.props.isSelected === true ? { backgroundColor: '#007AFF'} : null;
    let dayStyle = this.props.isSelected === true ? { color: 'white' } : null;

    return (
      <TouchableOpacity style={[styles.dayWrapper, customStyle]}
                        onPress={()=>this.props.onSelected(this.props.date)}>
        {this.props.isToday ?
          <Text style={[styles.day, dayStyle]}>Today</Text>:
          <Text style={[styles.day, dayStyle]}>{moment(this.props.date).date()}</Text>
        }
      </TouchableOpacity>
    );
  }
});

let Calendar = React.createClass({

  propTypes: {
    scrollEnabled: PropTypes.bool,
    startDate: PropTypes.string,
    headings: PropTypes.array,
    renderDay: PropTypes.func,
    selectDay: PropTypes.func
  },

  getDefaultProps () {
    return {
      scrollEnabled: false,
      selectedDay: moment().format('YYYY-MM-DD'),
      headings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      selectDay (day) {
        console.log(moment(day).format('YYYY-MM-DD'));
      }
    }
  },

  getInitialState () {
    return {
      selectedDate: this.props.startDate,
      currentDate: moment(this.props.startDate).format('YYYY-MM-DD'),
      calendarDate: this.getInitialStack()
    }
  },

  componentWillMount () {
    this.renderedMonths = [];
  },

  componentDidMount () {
    this._scrollToItem(VIEW_INDEX);
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
          <ScrollView
            ref='calendar'
            horizontal={true}
            scrollEnabled={true}
            pagingEnabled={true}
            removeClippedSubviews={true}
            scrollEventThrottle={600}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            onMomentumScrollEnd={(event) => this._scrollEnded(event)}>
            {this.state.calendarDate.map((date)=>this._renderMonth(date))}
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
        <TouchableOpacity style={styles.nav} onPress={this._onPrev}>
          <View style={[styles.arrow, styles.left]} />
        </TouchableOpacity>
        <Text style={styles.title}>{moment(this.state.currentDate).format('MMM YYYY')}</Text>
        <TouchableOpacity style={styles.nav} onPress={this._onNext}>
          <View style={[styles.arrow, styles.right]} />
        </TouchableOpacity>
      </View>
    );
  },

  _renderHeading () {
    return (
      <View style={styles.heading}>
        {this.props.headings.map((heading, index)=>
          <Text key={`calendar-heading-${index}`} style={styles.headingUnit}>{heading}</Text>
        )}
      </View>
    );
  },

  _renderMonth (date) {
    // current month
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

            if (this.props.renderDay) {
              days.push(this.props.renderDay(newDay, isToday));
            } else {
              days.push(this._renderDefaultDay(newDay, isToday));
            }

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

      if (days.length == 0) {

      } else {
        weeks.push(<View style={styles.weekWrapper}>{days}</View>);
      }
    }

    let renderedMonthView = <View style={{width:DEVICE_WIDTH}}>{weeks}</View>;
    this.renderedMonths.push([date, renderedMonthView]);
    return renderedMonthView;

  },

  _renderDefaultDay (newDay, isToday) {
    let newDayFormatted = moment(newDay).format('YYYY-MM-DD');
    let isSelected = moment(this.state.selectedDate).format('YYYY-MM-DD') === newDayFormatted;

    return (<Day date={newDay}
                 isToday={isToday}
                 isSelected={isSelected}
                 onSelected={()=>{
                   this.setState({
                     selectedDate: newDayFormatted
                   });
                 }} />);
  },

  _onPrev () {
    this._onPrependMonth();
    this._scrollToItem(VIEW_INDEX);
  },

  _onNext () {
    this._onAppendMonth();
    this._scrollToItem(VIEW_INDEX);
  },

  _onPrependMonth () {
    var calendarDates = this.state.calendarDate;
    calendarDates.unshift(moment(calendarDates[0]).subtract(1, 'month').format());
    calendarDates.pop();
    this.setState({
      calendarDate: calendarDates,
      currentDate: calendarDates[this.props.scrollEnabled ? VIEW_INDEX : 0]
    });
  },

  _onAppendMonth () {
    var calendarDates = this.state.calendarDate;
    calendarDates.push(moment(calendarDates[calendarDates.length - 1]).add(1, 'month').format());
    calendarDates.shift();
    this.setState({
      calendarDate: calendarDates,
      currentDate: calendarDates[this.props.scrollEnabled ? VIEW_INDEX : 0]
    });
  },

  _scrollToItem (itemIndex) {
    var scrollToX = itemIndex * DEVICE_WIDTH;
    if (this.props.scrollEnabled) {
      this.refs.calendar.scrollWithoutAnimationTo(0, scrollToX);
    }
  },

  _scrollEnded (evt) {
    var position = evt.nativeEvent.contentOffset.x;
    var currentPage = position / DEVICE_WIDTH;

    if (currentPage < VIEW_INDEX) {
      this._onPrependMonth();
      this._scrollToItem(VIEW_INDEX);
    } else if (currentPage > VIEW_INDEX) {
      this._onAppendMonth();
      this._scrollToItem(VIEW_INDEX);
    } else {
      return false;
    }
  }

});

module.exports = Calendar;
