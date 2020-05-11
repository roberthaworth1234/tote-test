import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import WebView from "react-native-webview";
import Loader from "./Loader";

export default class IndividualArticlePage extends Component {
  state = {
    loader: true
  };
  showPage = () => {
    return this.setState({ loader: false });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.loader && <Loader />}
        <WebView
          onLoadStart={() => {
            this.showPage();
          }}
          source={{ uri: this.props.webUrl }}
        ></WebView>
        <Button title="Back" onPress={this.props.handleBack}></Button>
      </React.Fragment>
    );
  }
}
