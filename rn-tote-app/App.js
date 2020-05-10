import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from "react-native";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import Search from "./assets/components/Search";
import IndividualAriclePage from "./assets/components/IndividualArticlePage";
import Arrows from "./assets/components/Arrows";
import { getArticlesBySearch } from "./assets/utils/api";
import { formatDates } from "./assets/utils/utilityFunctions";

export default class App extends Component {
  state = {
    animatedValue: new Animated.Value(0),
    news: [],
    animationDirection: -300,
    currentPage: 1,
    TotalPages: 0,
    date: formatDates(new Date()),
    lastSearchText: "",
    lastSearchTopic: null,
    selected: false,
    swiped: null
  };

  _start = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 1000
    }).start();
  };
  _reset = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration: 1
    }).start();
  };
  componentDidMount = () => {
    getArticlesBySearch(
      null,
      null,
      this.state.date,
      this.state.currentPage
    ).then(res => {
      this.updateArticles(res);
    });
  };

  onSwipeLeft(gestureState) {
    this.setState({ swiped: "You swiped left!" });
  }

  onSwipeRight(gestureState) {
    this.setState({ swiped: "You swiped right!" });
  }
  handleSearchUpdate = (lastSearchText, lastSearchTopic, date) => {
    this.setState({
      lastSearchText,
      lastSearchTopic,
      date,
      currentPage: 1
    });
  };

  handleBack = () => {
    this.setState({ selected: null });
  };

  onSwipe(gestureName, gestureState) {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_LEFT:
        this.handlePage("right"), this.setState({ animationDirection: +300 });
        break;
      case SWIPE_RIGHT:
        this.handlePage("left"), this.setState({ animationDirection: -300 });
        break;
    }
  }

  render() {
    let { animatedValue } = this.state;
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
          flex: 1
        }}
      >
        <View style={styles.container}>
          <Search
            date={this.state.date}
            handleSearchUpdate={this.handleSearchUpdate}
            currentPage={this.state.currentPage}
            updateArticles={this.updateArticles}
          />
          <View style={styles.bottomContainer}>
            <Arrows handlePage={this.handlePage} />
            {this.state.news.map((story, i) => {
              return (
                <Animated.View
                  key={i}
                  style={{
                    transform: [
                      {
                        translateX: animatedValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [this.state.animationDirection, 0]
                        })
                      }
                    ],
                    opacity: this.state.animatedValue,
                    flex: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    justifyContent: "center",
                    backgroundColor: "#A40A07",
                    borderRadius: 10,
                    marginVertical: 2,
                    width: "80%"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.handleSelection(story.webUrl);
                    }}
                  >
                    <Text style={styles.text}>
                      {story.webTitle.length > 90
                        ? story.webTitle.substring(0, 87) + "..."
                        : story.webTitle}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
            <Text style={styles.text}>
              {this.state.TotalPages === 0
                ? "No data for this search. Please try a new search"
                : "Page " +
                  this.state.currentPage +
                  " of " +
                  this.state.TotalPages}
            </Text>
          </View>
        </View>
      </GestureRecognizer>
    );
  }
  handlePage = direction => {
    const {
      lastSearchText,
      lastSearchTopic,
      date,
      currentPage,
      TotalPages
    } = this.state;
    if (direction === "right") {
      if (currentPage !== TotalPages) {
        this._reset();
      }
      getArticlesBySearch(
        lastSearchText,
        lastSearchTopic,
        date,
        currentPage + 1
      ).then(data => {
        this._start();
        this.setState(currentState => {
          return {
            currentPage:
              currentState.currentPage === currentState.TotalPages
                ? currentState.currentPage
                : currentState.currentPage + 1,
            news:
              currentState.currentPage === currentState.TotalPages
                ? currentState.news
                : data.response.results
          };
        });
      });
    } else if (direction === "left") {
      if (currentPage !== 1) {
        this._reset();
      }
      getArticlesBySearch(
        lastSearchText,
        lastSearchTopic,
        date,
        currentPage - 1
      ).then(data => {
        this._start();
        this.setState(currentState => {
          return {
            currentPage:
              currentState.currentPage === 1
                ? currentState.currentPage
                : currentState.currentPage - 1,
            news:
              currentState.currentPage === 1
                ? currentState.news
                : data.response.results
          };
        });
      });
    }
  };
  handleSelection = url => {
    this.setState({ selected: url });
  };
  updateArticles = data => {
    this.setState({
      news: data.response.results,
      TotalPages: data.response.pages
    });
    this._start();
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
    paddingVertical: 6,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 11,

    color: "#FFF"
  },
  article: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    justifyContent: "center",
    backgroundColor: "#A40A07",
    borderRadius: 10,
    marginVertical: 2,
    width: "80%"
  }
});
