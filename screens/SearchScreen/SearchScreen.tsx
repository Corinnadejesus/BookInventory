import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { useState } from "react";
import { Text, View } from "../../components/Themed";
import { useLazyQuery } from "@apollo/client";
import BookItem from "../../components/BookItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchQuery } from "./queries";
import { parseBook } from "../../services/bookService";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState<
    "googleBooksSearch" | "openLibrarySearch"
  >("googleBooksSearch");

  const [runQuery, { data, loading, error }] = useLazyQuery(searchQuery);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search Book Title, ISBN, Category.."
          style={styles.input}
        />
        <Button
          title="Search"
          onPress={() => runQuery({ variables: { q: search } })}
        />
      </View>

      <View style={styles.tabs}>
        <Text
          style={
            provider === "googleBooksSearch"
              ? { fontWeight: "bold", color: "royalblue" }
              : {}
          }
          onPress={() => setProvider("googleBooksSearch")}
        >
          Google Books
        </Text>
        <Text
          style={
            provider === "openLibrarySearch"
              ? { fontWeight: "bold", color: "royalblue" }
              : {}
          }
          onPress={() => setProvider("openLibrarySearch")}
        >
          Open Library
        </Text>
      </View>

      {loading && <ActivityIndicator />}
      {error && (
        <>
          <Text>Error Fetching Books</Text>
          <Text>{error.message}</Text>
        </>
      )}
      <FlatList
        data={
          (provider === "googleBooksSearch"
            ? data?.googleBooksSearch?.items
            : data?.openLibrarySearch?.docs) || []
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <BookItem book={parseBook(item, provider)} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F1EFF1",
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1EFF1",
  },
  input: {
    flex: 1,
    borderWidth: 1.3,
    borderColor: "pink",
    borderRadius: 7,
    padding: 10,
    marginVertical: 5,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    alignItems: "center",
    backgroundColor: "#F1EFF1",
  },
});
