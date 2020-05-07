import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "./assets/components/Header";
import { skyblue } from "color-name";
import { data } from "./dummyData";
import { data1 } from "./dummy1";

export default class App extends Component {
  state = {
    news: [],
    currentPage: 1,
    TotalPages: 0
  };

  componentDidMount = () => {
    this.setState({ news: data.response.results });
  };
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              this.handlePage("right");
            }}
            style={styles.arrowRight}
          >
            <Text>=></Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.handlePage("left");
            }}
            style={styles.arrowLeft}
          >
            <Text>{"<="}</Text>
          </TouchableOpacity>
          {this.state.news.map((story, i) => {
            return (
              <View key={i} style={styles.article}>
                <Text style={styles.text}>{story.webTitle}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
  handlePage = direction => {
    if (direction === "right") {
      this.setState(currentState => {
        return {
          currentPage: currentState.currentPage + 1,
          news: data1.response.results
        };
      });
    } else if (direction === "left") {
      this.setState(currentState => {
        return {
          currentPage: currentState.currentPage - 1,
          news: data.response.results
        };
      });
    }
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
  },
  arrowRight: {
    position: "absolute",
    right: 2,
    top: "50%"
  },
  arrowLeft: {
    position: "absolute",
    left: 2,
    top: "50%"
  }
});
