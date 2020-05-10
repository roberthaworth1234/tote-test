import React, { useState } from "react";
import { View, Button, Platform } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function MyDatePicker({ handleDate }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    handleDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Choose a date" />
      </View>

      {show && (
        <DateTimePicker
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
