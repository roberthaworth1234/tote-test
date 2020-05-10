import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Header({ toggleOverlay }) {
  return (
    <React.Fragment>
      <Image style={styles.logo} source={require("../Images/logo.png")} />
      <TouchableOpacity
        onPress={() => {
          toggleOverlay("search");
        }}
      >
        <Image
          style={styles.searchIcon}
          source={{
            uri: "https://img.icons8.com/pastel-glyph/64/000000/search--v2.png"
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          toggleOverlay("about");
        }}
      >
        <Image
          style={styles.aboutIcon}
          source={{
            uri: "https://img.icons8.com/carbon-copy/100/000000/about.png"
          }}
        />
      </TouchableOpacity>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  searchIcon: {
    height: 40,
    width: 40
  },
  aboutIcon: {
    marginRight: "8%",
    height: 40,
    width: 40
  },
  logo: {
    marginLeft: "8%",
    height: 65,
    width: 65
  }
});
