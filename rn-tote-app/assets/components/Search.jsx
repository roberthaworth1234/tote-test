import React, { Component } from "react";

import { StyleSheet, Text, View, TextInput } from "react-native";
import { Overlay, Button } from "react-native-elements";
import MyDatePicker from "./MyDatePicker";
import TopicList from "./TopicList";

export default class Search extends Component {
  state = {
    date: "2020-04-15",
    isVisible: false,
    inputText: "",
    topics: [
      {
        title: "Politics",
        url: "https://img.icons8.com/ios-glyphs/30/000000/us-capitol.png"
      },
      {
        title: "World",
        url: "https://img.icons8.com/ios-glyphs/30/000000/globe.png"
      },
      {
        title: "Sport",
        url: "https://img.icons8.com/ios-glyphs/30/000000/sport.png"
      },
      {
        title: "Football",
        url: "https://img.icons8.com/ios-glyphs/30/000000/football2.png"
      },
      {
        title: "Tech",
        url: "https://img.icons8.com/ios-glyphs/30/000000/macbook.png"
      },
      {
        title: "Travel",
        url: "https://img.icons8.com/ios-glyphs/30/000000/around-the-globe.png"
      },
      {
        title: "Environment",
        url: "https://img.icons8.com/ios-glyphs/30/000000/recycle-sign.png"
      },
      {
        title: "Education",
        url: "https://img.icons8.com/ios-glyphs/30/000000/education.png"
      },
      {
        title: "Money",
        url: "https://img.icons8.com/ios-glyphs/30/000000/money.png"
      },
      {
        title: "Culture",
        url: "https://img.icons8.com/ios-glyphs/30/000000/archeology.png"
      },
      {
        title: "Business",
        url: "https://img.icons8.com/ios-glyphs/30/000000/business.png"
      },
      {
        title: "Science",
        url: "https://img.icons8.com/ios-glyphs/30/000000/microscope.png"
      }
    ],
    selectedTopic: null,
    dateFrom: null,
    backgroundColor: "green",
    selectedTopicToggle: false
  };
  onChangeText = text => {
    this.setState({ inputText: text });
  };
  render() {
    const visible = this.state.isVisible;
    return (
      <View style={styles.container}>
        <Text>Tote News</Text>
        <Button title="Open Overlay" onPress={this.toggleOverlay} />

        <Overlay isVisible={visible} onBackdropPress={this.toggleOverlay}>
          <View>
            <TextInput
              placeholder="Enter keyword search here"
              style={{
                height: 40,
                width: "100%",
                borderColor: "gray",
                borderWidth: 1
              }}
              onChangeText={text => this.onChangeText(text)}
              value={this.state.inputText}
            />
            <Button title="submit" onPress={this.handleSubmit}></Button>
            <Text
              style={{
                fontSize: 8,
                opacity: 0.75,
                color: "gray",
                marginBottom: 5
              }}
            >
              You can select a topic and date to refine your keyword search
            </Text>
            <TopicList
              handleTopic={this.handleTopic}
              selectedTopic={this.state.selectedTopic}
              selectedTopicToggle={this.state.selectedTopicToggle}
              topics={this.state.topics}
            />
            <MyDatePicker date={this.state.date} handleDate={this.handleDate} />
          </View>
        </Overlay>
      </View>
    );
  }
  handleSubmit = e => {
    console.log(
      this.state.inputText +
        " " +
        this.state.selectedTopic +
        " " +
        this.state.date
    );
  };
  toggleOverlay = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };
  handleTopic = topic => {
    if (this.state.selectedTopicToggle && this.state.selectedTopic === topic) {
      this.setState({ selectedTopicToggle: false });
    } else {
      this.setState({
        selectedTopic: topic,
        selectedTopicToggle: true
      });
    }
  };
  handleDate = date => {
    this.setState({ date });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  pickerContainerRight: {
    alignSelf: "flex-end"
  },
  pickerContainerLeft: {
    alignSelf: "flex-start"
  }
});
