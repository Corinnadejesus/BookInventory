/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import MyBooksScreen from "../screens/MyBooksScreen";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import MyBookDetails from "../screens/MyBookDetails";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Details"
        component={MyBookDetails}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="My Books"
        component={MyBooksScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
