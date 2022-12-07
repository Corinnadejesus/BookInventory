import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useMyBooks } from "../context/MyBooksProvider";
import { useNavigation } from "@react-navigation/native";

type BookItemProps = {
  book: Book;
};

const BookItem = ({ book }: BookItemProps) => {
  const { isBookSaved, onToggleSaved } = useMyBooks();

  const saved = isBookSaved(book);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Details", { book });
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: book?.image }} style={styles.image} />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{book.title}</Text>

          <Text>by {book.authors?.join(", ")}</Text>
          <Pressable
            style={[
              styles.button,
              saved ? { backgroundColor: "lightcoral" } : {},
            ]}
            onPress={() => onToggleSaved(book)}
          >
            <Text style={styles.buttonText}>
              {saved ? "Remove Book" : "Save Book"}
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
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
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "royalblue",
    alignSelf: "flex-start",
    marginTop: "auto",
    marginVertical: 10,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default BookItem;
