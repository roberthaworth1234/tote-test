import React, { Component } from "react";

import { StyleSheet, Text, View, TextInput } from "react-native";
import { Overlay, Button } from "react-native-elements";
import { Dimensions } from "react-native";

import MyDatePicker from "./MyDatePicker";
import TopicList from "./TopicList";
import Header from "./Header";
import About from "./About";

import {
  formatDates,
  validateSearch,
  formatText
} from "../utils/utilityFunctions";

import { getArticlesBySearch } from "../utils/api";

export default class Search extends Component {
  state = {
    searchError: null,
    date: formatDates(new Date()),
    searchIsVisible: false,
    aboutIsVisible: false,
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
        title: "Technology",
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
    selectedTopicToggle: false
  };

  render() {
    const { aboutIsVisible, searchIsVisible } = this.state;

    return (
      <View style={styles.container}>
        <Header toggleOverlay={this.toggleOverlay} />

        <Overlay
          overlayStyle={{ backgroundColor: "lightgrey" }}
          isVisible={searchIsVisible}
          onBackdropPress={() => {
            this.toggleOverlay("search");
          }}
        >
          <View>
            <Text style={{ fontSize: 10, color: "red" }}>
              {this.state.searchError}
            </Text>
            <TextInput
              placeholder="Enter keyword search here"
              placeholderStyle={{ padding: 20 }}
              style={styles.textInput}
              onChangeText={text => this.onChangeText(text)}
              value={this.state.inputText}
            />
            <Button title="Submit" onPress={this.handleSubmit}></Button>
            <Text style={styles.refineText}>
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
        <Overlay
          overlayStyle={{ backgroundColor: "lightgrey" }}
          isVisible={aboutIsVisible}
          onBackdropPress={() => {
            this.toggleOverlay("about");
          }}
        >
          <About />
        </Overlay>
      </View>
    );
  }

  handleSubmit = e => {
    const { inputText, selectedTopic, date } = this.state;
    if (!validateSearch(inputText)) {
      return this.setState({
        searchError: "special characters are not allowed, try again",
        inputText: ""
      });
    } else {
      let text = formatText(inputText);
      this.props.handleSearchUpdate(inputText, selectedTopic, date);
      getArticlesBySearch(text, selectedTopic, date, 1).then(res => {
        return this.props.updateArticles(res);
      });
      this.setState({ inputText: "", searchIsVisible: false });
    }
  };

  handleTopic = topic => {
    if (this.state.selectedTopicToggle && this.state.selectedTopic === topic) {
      this.setState({
        selectedTopicToggle: false,
        selectedTopic: null
      });
    } else {
      this.setState({
        selectedTopicToggle: true,
        selectedTopic: topic
      });
    }
  };

  toggleOverlay = overlay => {
    overlay === "search"
      ? this.setState({ searchIsVisible: !this.state.searchIsVisible })
      : this.setState({ aboutIsVisible: !this.state.aboutIsVisible });
  };

  onChangeText = text => {
    this.state.searchError
      ? this.setState({ searchError: null, inputText: text })
      : this.setState({ inputText: text });
  };

  handleDate = date => {
    date = formatDates(date);
    this.setState({ date });
  };
}

let windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  overlayContainer: {
    backgroundColor: "grey"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#7C7A7A",
    alignItems: "center",
    width: windowWidth,
    justifyContent: "space-between"
  },
  pickerContainerRight: {
    alignSelf: "flex-end"
  },
  pickerContainerLeft: {
    alignSelf: "flex-start"
  },
  refineText: {
    fontSize: 8,
    color: "grey",
    marginBottom: 5
  },
  textInput: {
    height: 40,
    width: windowWidth * 0.8,
    borderColor: "gray",
    borderWidth: 1.5,
    borderRadius: 5
  }
});
