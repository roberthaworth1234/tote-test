import React, { Component } from "react";
import { StyleSheet, Animated, View, Text } from "react-native";

export default class Loader extends Component {
  state = {
    animatedValue: new Animated.Value(0)
  };
  _start = () => {
    Animated.loop(
      Animated.timing(this.state.animatedValue, {
        toValue: 1,
        duration: 1000,
        Infinite: true
      })
    ).start();
  };
  componentDidMount = () => {
    this._start();
  };
  render() {
    const { animatedValue } = this.state;
    return (
      <View
        style={{ justifyContent: "center", alignItems: "center", height: 300 }}
      >
        <Animated.Text
          style={{
            opacity: animatedValue,
            color: "goldenrod"
          }}
        >
          Loading...
        </Animated.Text>
        <Animated.Image
          style={{
            width: 80,
            height: 80,
            transform: [
              {
                rotate: this.state.animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"]
                })
              }
            ]
          }}
          source={{
            uri: "https://img.icons8.com/office/80/000000/spinner-frame-5.png"
          }}
        ></Animated.Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {}
});
