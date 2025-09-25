// App.js
import React, { useEffect, useState, useMemo } from "react";
import { Appearance, LogBox, StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { LightTheme, DarkTheme } from "./themes/theme"; // Directly import themes
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "./screens/HomeScreen";

// Ignore unnecessary warnings
LogBox.ignoreLogs(["Setting a timer"]);

const Stack = createNativeStackNavigator();

export default function App() {
  // Get initial system color scheme
  const [scheme, setScheme] = useState(Appearance.getColorScheme() || "light");

  // Listen to system theme changes
  useEffect(() => {
    const listener = ({ colorScheme }) => {
      setScheme(colorScheme || "light");
    };

    const subscription = Appearance.addChangeListener(listener);
    return () => subscription.remove();
  }, []);

  // Memoize theme for performance
  const theme = useMemo(() => {
    const currentTheme = scheme === "dark" ? DarkTheme : LightTheme;
    console.log("📢 Current app theme:", currentTheme.name); // Log current theme
    return currentTheme;
  }, [scheme]);

  return (
    <ThemeProvider theme={theme}>
      {/* Set StatusBar according to theme */}
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.colors.background} />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* Add more screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
