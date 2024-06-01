import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { AntDesign } from '@expo/vector-icons';

export default function schedule() {
  //get Today

  return (
    <View>
      <Calendar
        // Initially visible month. Default = now
        // initialDate={now}
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        // Hide month navigation arrows. Default = false
        // hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={(direction) => {
          if( direction === 'left') return <AntDesign name="arrowleft" size={24} color="black" />
          if( direction === 'right') return <AntDesign name="arrowright" size={24} color="black" />
        }}
        // Do not show days of other months in month page. Default = false
        // hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        // disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        // firstDay={1}
        // Hide day names. Default = false
        // hideDayNames={true}
        // Show week numberls to the left. Default = false
        // showWeekNumbers={fa}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        // disableArrowLeft={true}
        // Disable right arrow. Default = false
        // disableArrowRight={true}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        // disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={(date) => {
          /*Return JSX*/
        }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundCalendar: {
    backgroundColor: 'red',
  }
})