import { FlatList, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { useMyBooks } from "../context/MyBooksProvider";
import BookDetails from "../components/BookDetails";

export default function MyBookDetails() {
  const { savedBooks } = useMyBooks();
  return (
    <View style={styles.container}>
      <FlatList
        data={savedBooks}
        renderItem={({ item }) => <BookDetails book={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
