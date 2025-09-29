import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, Appearance } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import CreateMatchScreen from "./screens/CreateMatchScreen";
import MatchHistoryScreen from "./screens/MatchHistoryScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";           // <--- Import LoginScreen
import SignUpScreen from "./screens/SignupScreen";         // <--- Import SignUpScreen
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen"; // <--- Import ForgotPasswordScreen

import { getThemeObjects } from "./themes/theme";

const Stack = createStackNavigator();

export default function App() {
  // Initial system theme
  const systemColorScheme = Appearance.getColorScheme();
  const [themeMode, setThemeMode] = useState(systemColorScheme || "light");
  const [isManual, setIsManual] = useState(false); // track manual toggle

  // Listen for system changes (if not manually toggled)
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (!isManual) {
        setThemeMode(colorScheme);
      }
    });

    return () => subscription.remove();
  }, [isManual]);

  // Toggle theme manually
  const toggleTheme = () => {
    setThemeMode(prev => (prev === "dark" ? "light" : "dark"));
    setIsManual(true);
  };

  // Get both themes
  const { lightTheme, darkTheme } = getThemeObjects();
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  // Navigation theme
  const navigationTheme = {
    dark: themeMode === "dark",
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
      heavy: { fontFamily: "System", fontWeight: theme.fontWeight.semibold },
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      {/* StatusBar matches the theme background and content */}
      <StatusBar
        backgroundColor={theme.colors.surface} // Match the header color
        barStyle={themeMode === "dark" ? "light-content" : "dark-content"} // Bright text on dark, dark text on light
      />

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
          headerTitleAlign: "center",
        }}
      >
        {/* HomeScreen with toggleTheme and themeMode props */}
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => (
            <HomeScreen
              {...props}
              toggleTheme={toggleTheme}
              themeMode={themeMode}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="CreateMatch"
          component={CreateMatchScreen}
          options={{ title: "Create Match" }}
        />
        <Stack.Screen
          name="History"
          component={MatchHistoryScreen}
          options={{ title: "Match History" }}
        />

        <Stack.Screen name="Register" options={{ title: "Register" }}>
          {(props) => <RegisterScreen {...props} themeMode={themeMode} />}
        </Stack.Screen>

        {/* New Authentication Screens */}
       <Stack.Screen
  name="LoginScreen"
  options={{ title: "Login" }}
>
  {props => <LoginScreen {...props} themeMode={themeMode} />}
</Stack.Screen>

<Stack.Screen
  name="SignUpScreen"
  options={{ title: "Sign Up" }}
>
  {props => <SignUpScreen {...props} themeMode={themeMode} />}
</Stack.Screen>

<Stack.Screen
  name="ForgotPasswordScreen"
  options={{ title: "Forgot Password" }}
>
  {props => <ForgotPasswordScreen {...props} themeMode={themeMode} />}
</Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}