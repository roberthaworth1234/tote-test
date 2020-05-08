import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Arrows({ handlePage }) {
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => {
          handlePage("right");
        }}
        style={styles.arrowRight}
      >
        <Text>{"→"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handlePage("left");
        }}
        style={styles.arrowLeft}
      >
        <Text>{"←"}</Text>
      </TouchableOpacity>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  arrowRight: {
    position: "absolute",
    right: 7,
    top: "50%"
  },
  arrowLeft: {
    position: "absolute",
    left: 7,
    top: "50%"
  }
});
