import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

const BookDetails = () => {
  const {
    params: { book },
  } = useRoute();

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <View>
        <Image source={{ uri: book?.image }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.fonts}>{book.title}</Text>
          <Text>
            Subtitle: {book.subtitle ? book.subtitle : "No Subtitle Added"}
          </Text>
          <Text>
            Author:{" "}
            {book.authors ? book.authors?.join(", ") : "No Authors Added"}
          </Text>
          <Text>Rating: {book.rating ? book.rating : "No Rating Added"}</Text>
          <Text>Category: {book.categories?.join(", ")}</Text>
          <Text>{book.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1EFF1",
  },
  image: {
    flex: 1,
    aspectRatio: 3 / 4,
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1.8,
    alignItems: "center",
    justifyContent: "center",
  },
  fonts: {
    fontWeight: "bold",
  },
});

export default BookDetails;
