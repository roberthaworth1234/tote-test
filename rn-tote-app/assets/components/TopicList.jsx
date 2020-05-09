import React from "react";
import { TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";

export default function TopicList({
  handleTopic,
  topics,
  selectedTopic,
  selectedTopicToggle
}) {
  return topics.map((topic, i) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleTopic(topic.title);
        }}
        key={topic.title}
      >
        <ListItem
          containerStyle={{
            backgroundColor:
              selectedTopicToggle && selectedTopic === topic.title
                ? "green"
                : "#FFF",
            marginTop: 0,
            paddingTop: 2,
            paddingBottom: 2
          }}
          leftAvatar={{
            source: { uri: topic.url },
            containerStyle: { width: 15, height: 15 }
          }}
          title={topic.title}
          subtitle={
            selectedTopicToggle && selectedTopic === topic.title
              ? "combined to search"
              : null
          }
          bottomDivider
        />
      </TouchableOpacity>
    );
  });
}
