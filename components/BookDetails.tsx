import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

const BookDetails = () => {
  const {
    params: { book },
  } = useRoute();

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View>
        <Image source={{ uri: book?.image }} style={styles.image} />
        <Text>Author: {book.title}</Text>
        <Text>by {book.authors?.join(", ")}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  image: {
    flex: 2,
    aspectRatio: 2 / 3,
    marginRight: 10,
  },
  contentContainer: {
    flex: 4,
    borderColor: "lightgray",
    borderBottomWidth: 0.5,
  },
});

export default BookDetails;
