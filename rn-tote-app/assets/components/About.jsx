import React from "react";

import {
  Text,
  TouchableOpacity,
  Clipboard,
  StyleSheet,
  View
} from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Guard News Search</Text>
      <Text style={styles.text}>
        Guard utilises the Guardian new API and provides a search function to
        let you swipe through pages of data and connects you to the individual
        article web page.
      </Text>
      <Text style={styles.text}>
        You can search keywords, select a section / topic and the date search
        will provide the newest information from the date selected.
      </Text>
      <TouchableOpacity
        onPress={() =>
          Clipboard.setString("https://icons8.com/icons/set/education")
        }
      >
        <Text style={styles.text}>
          This application used icons8 for the all icons used. Click HERE to
          copy link to clipboard{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    borderColor: "blue",
    borderStyle: "solid"
  },
  header: {
    fontSize: 18,
    padding: 20
  },
  text: {
    padding: 15
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center"
  }
});
