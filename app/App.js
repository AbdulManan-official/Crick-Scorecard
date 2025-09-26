import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import CreateMatchScreen from "./screens/CreateMatchScreen";
import MatchHistoryScreen from "./screens/MatchHistoryScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { useAppTheme } from "./themes/theme";

const Stack = createStackNavigator();

export default function App() {
  const theme = useAppTheme();
  const colorScheme = useColorScheme();

  // navigation theme synced with your custom theme.js
  const navigationTheme = {
    dark: colorScheme === "dark",
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.primary,
    },
    fonts: {
      regular: { fontFamily: "System", fontWeight: theme.fontWeight.normal },
      medium: { fontFamily: "System", fontWeight: theme.fontWeight.medium },
      bold: { fontFamily: "System", fontWeight: theme.fontWeight.bold },
      heavy: { fontFamily: "System", fontWeight: theme.fontWeight.semibold }, // using semibold from your theme
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: theme.fontWeight.bold,
            fontSize: theme.fontSize.lg,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown:"" }} />
        <Stack.Screen name="CreateMatch" component={CreateMatchScreen} options={{ title: "Create Match" }} />
        <Stack.Screen name="History" component={MatchHistoryScreen} options={{ title: "Match History" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Register" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
