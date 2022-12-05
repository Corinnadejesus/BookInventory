import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import MyBooksProvider from "./context/MyBooksProvider";

const API_KEY =
  "santuario::stepzen.net+1000::97761f62cbee8cbe67f6ce10dbe5c95e8c5048f9de04f0b16b1e07bc2bccc531";

const client = new ApolloClient({
  uri: "https://santuario.stepzen.net/api/knotted-badger/__graphql",
  headers: {
    Authorization: `ApiKey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <MyBooksProvider>
            <Navigation colorScheme={colorScheme} />
          </MyBooksProvider>
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
