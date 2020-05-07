import React, { Component } from "react";

import { StyleSheet, Text, View } from "react-native";
import { Overlay, Button } from "react-native-elements";

export default class Header extends Component {
  state = {
    isVisible: false
  };
  render() {
    const visible = this.state.isVisible;
    return (
      <View style={styles.container}>
        <Button title="Open Overlay" onPress={this.toggleOverlay} />

        <Overlay isVisible={visible} onBackdropPress={this.toggleOverlay}>
          <Text>Hello from Overlay!</Text>
        </Overlay>
        <Text>Tote News</Text>
      </View>
    );
  }
  toggleOverlay = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
