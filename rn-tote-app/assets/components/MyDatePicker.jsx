import React, { useState } from "react";
import { View, Button, Platform } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function MyDatePicker({ handleDate }) {
  // const windowWidth = Dimensions.get("window").width;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    handleDate(currentDate);
  };

  showMode = currentMode => {
    setShow(!show);
    setMode(currentMode);
  };

  showDatepicker = () => {
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

// export default App;

// export default function MyDatePicker({ date, handleDate }) {
//   const windowWidth = Dimensions.get("window").width;
//   return (
//     <View
//       style={{
//         width: windowWidth - (windowWidth / 100) * 30,
//         marginVertical: 10
//       }}
//     >
//       <DatePicker
//         style={{ width: "100%" }}
//         date={date}
//         mode="date"
//         placeholder="select date"
//         format="YYYY-MM-DD"
//         minDate="1900-01-01"
//         maxDate={new Date()}
//         confirmBtnText="Confirm"
//         cancelBtnText="Cancel"
//         customStyles={{
//           dateIcon: {
//             position: "absolute",
//             left: 0,
//             top: 4,
//             marginLeft: 0
//           },
//           dateInput: {
//             marginLeft: 36
//           }
//           // ... You can check the source to find the other keys.
//         }}
//         onDateChange={date => {
//           return handleDate(date);
//         }}
//       />
//     </View>
//   );
// }
