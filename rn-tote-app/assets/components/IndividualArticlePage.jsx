import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Button } from "react-native-elements";
import WebView from "react-native-webview";

export default function IndividualArticlePage({ webUrl, handleBack }) {
  return (
    <React.Fragment>
      <WebView source={{ uri: webUrl }}></WebView>
      <Button
        title="Back"
        onPress={() => {
          handleBack();
        }}
      ></Button>
    </React.Fragment>
  );
}
