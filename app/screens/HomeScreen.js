// screens/HomeScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from "react-native";
import { useTheme } from "styled-components/native";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Status Bar */}
      <StatusBar
        barStyle={theme.name === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />

      {/* Title */}
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Cricket Scorer
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        Keep track of your matches easily
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {/* Start New Match */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate("MatchSetup")}
        >
          <Text style={[styles.buttonText, { color: theme.colors.textInverse }]}>
            Start New Match
          </Text>
        </TouchableOpacity>

        {/* Match History */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.secondary }]}
          onPress={() => navigation.navigate("MatchHistory")}
        >
          <Text style={[styles.buttonText, { color: theme.colors.textInverse }]}>
            Match History
          </Text>
        </TouchableOpacity>

        {/* Profile / Sign-In */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: theme.colors.highlight,
              borderWidth: 1,
              borderColor: theme.colors.primary,
            },
          ]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={[styles.buttonText, { color: theme.colors.primary }]}>
            Profile / Sign-In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
