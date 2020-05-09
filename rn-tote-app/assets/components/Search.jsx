import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import { Overlay, Button } from "react-native-elements";
import { Dimensions } from "react-native";
import MyDatePicker from "./MyDatePicker";
import TopicList from "./TopicList";
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
        <Image style={styles.logo} source={require("../Images/logo.png")} />
        <TouchableOpacity onPress={this.toggleOverlay}>
          <Image
            style={styles.searchIcon}
            source={{
              uri:
                "https://img.icons8.com/pastel-glyph/64/000000/search--v2.png"
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toggleOverlay}>
          <Image
            style={styles.aboutIcon}
            source={{
              uri: "https://img.icons8.com/carbon-copy/100/000000/about.png"
            }}
          />
        </TouchableOpacity>

        <Overlay isVisible={visible} onBackdropPress={this.toggleOverlay}>
          <View>
            <Text style={{ fontSize: 10, color: "red" }}>
              {this.state.searchError}
            </Text>
            <TextInput
              placeholder="Enter keyword search here"
              placeholderStyle={{ padding: 20 }}
              style={{
                height: 40,
                width: windowWidth * 0.7,
                borderColor: "gray",
                borderWidth: 1.5,
                borderRadius: 5
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
    const { inputText, selectedTopic, date } = this.state;
    if (!validateSearch(inputText)) {
      return this.setState({
        searchError: "special characters are not allowed, try again",
        searchBarColor: "red",
        inputText: ""
      });
    } else {
      let text = formatText(inputText);
      this.props.handleSearchUpdate(inputText, selectedTopic, date);
      getArticlesBySearch(
        text,
        selectedTopic,
        date,
        this.props.currentPage
      ).then(res => {
        return this.props.updateArticles(res);
      });
    }
  };
  toggleOverlay = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };
  handleTopic = topic => {
    if (this.state.selectedTopicToggle && this.state.selectedTopic === topic) {
      this.setState({ selectedTopicToggle: false, selectedTopic: null });
    } else {
      this.setState({
        selectedTopic: topic,
        selectedTopicToggle: true
      });
    }
  };
  handleDate = date => {
    date = formatDates(date);
    this.setState({ date });
  };
}
let windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  overlayContainer: {
    width: windowWidth
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
  logo: {
    marginLeft: "8%",
    height: 65,
    width: 65
  },
  searchIcon: {
    height: 40,
    width: 40
  },
  aboutIcon: {
    marginRight: "8%",
    height: 40,
    width: 40
  }
});
