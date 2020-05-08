import React from "react";
import { View } from "react-native";
import { Dimensions } from "react-native";
import DatePicker from "react-native-datepicker";

export default function MyDatePicker({ date, handleDate }) {
  const windowWidth = Dimensions.get("window").width;
  return (
    <View
      style={{
        width: windowWidth - (windowWidth / 100) * 30,
        marginVertical: 10
      }}
    >
      <DatePicker
        style={{ width: "100%" }}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="1900-01-01"
        maxDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={date => {
          return handleDate(date);
        }}
      />
    </View>
  );
}
