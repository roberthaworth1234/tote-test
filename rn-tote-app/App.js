import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import Search from "./assets/components/Search";
import IndividualAriclePage from "./assets/components/IndividualArticlePage";
import Arrows from "./assets/components/Arrows";
import { data } from "./dummyData";
import { data1 } from "./dummy1";

export default class App extends Component {
  state = {
    news: [],
    currentPage: 1,
    TotalPages: 0,
    selected: false,
    swiped: null
  };

  componentDidMount = () => {
    this.setState({ news: data.response.results });
  };

  onSwipeLeft(gestureState) {
    this.setState({ swiped: "You swiped left!" });
  }

  onSwipeRight(gestureState) {
    this.setState({ swiped: "You swiped right!" });
  }

  handleBack = () => {
    this.setState({ selected: null });
  };

  onSwipe(gestureName, gestureState) {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_LEFT:
        this.handlePage("right");
        break;
      case SWIPE_RIGHT:
        this.handlePage("left");
        break;
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    if (this.state.selected) {
      return (
        <IndividualAriclePage
          handleBack={this.handleBack}
          webUrl={this.state.selected}
        />
      );
    }
    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeLeft={state => this.onSwipeLeft(state)}
        onSwipeRight={state => this.onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor
        }}
      >
        <View style={styles.container}>
          <Search updateSearch={this.updateSearch} />
          <View style={styles.bottomContainer}>
            <Arrows handlePage={this.handlePage} />
            {this.state.news.map((story, i) => {
              return (
                <View key={i} style={styles.article}>
                  <TouchableOpacity
                    onPress={() => {
                      this.handleSelection(story.webUrl);
                    }}
                  >
                    <Text style={styles.text}>{story.webTitle}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </GestureRecognizer>
    );
  }
  handlePage = direction => {
    if (direction === "right") {
      this.setState(currentState => {
        return {
          currentPage:
            currentState.currentPage === currentState.TotalPages
              ? currentState.currentPage
              : currentState.currentPage + 1,
          news: data1.response.results
        };
      });
    } else if (direction === "left") {
      this.setState(currentState => {
        return {
          currentPage:
            currentState.currentPage === 1
              ? currentState.currentPage
              : currentState.currentPage - 1,
          news: data.response.results
        };
      });
    }
  };
  handleSelection = url => {
    this.setState({ selected: url });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  bottomContainer: {
    flex: 6,
    width: "100%",
    backgroundColor: "#746D75",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 12,
    paddingHorizontal: 15,
    color: "#FFF"
  },
  article: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue",
    borderRadius: 10,
    marginTop: 2,
    marginBottom: 2,
    width: "80%"
  }
});
