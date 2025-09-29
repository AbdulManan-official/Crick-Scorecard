import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getThemeObjects } from "../themes/theme";

export default function HomeScreen({ navigation, toggleTheme, themeMode }) {
  // Get both themes
  const { lightTheme, darkTheme } = getThemeObjects();

  // Use themeMode from App.js ("light" or "dark")
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  // Select image based on theme
  const imageSource =
    themeMode === "dark"
      ? require("../assets/3d.png")
      : require("../assets/3.png");

  // Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
      justifyContent: "center",
    },
    content: {
      alignItems: "center",
    },
    image: {
      width: 200,
      height: 150,
      resizeMode: "contain",
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      textAlign: "center",
    },
    subtitle: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.normal,
      color: theme.colors.textSecondary,
      textAlign: "center",
      lineHeight: 20,
      marginBottom: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      alignItems: "center",
      width: "100%",
      marginBottom: theme.spacing.md,
      ...theme.shadow.small,
    },
    buttonText: {
      color: theme.colors.buttonText,
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.semibold,
    },
    secondaryButton: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    secondaryButtonText: {
      color: theme.colors.text,
    },
    footer: {
      alignItems: "center",
      marginTop: theme.spacing.lg,
    },
    footerText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={imageSource} style={styles.image} />

        <Text style={styles.title}>CrickScrore</Text>
        <Text style={styles.subtitle}>
          Create matches, track your history, and manage players with ease.
        </Text>

        {/* Original buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateMatch")}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Create a Match</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate("History")}
          activeOpacity={0.85}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Match History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate("Register")}
          activeOpacity={0.85}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Register
          </Text>
        </TouchableOpacity>

        {/* Toggle Theme Button at the bottom */}
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={toggleTheme}
          activeOpacity={0.85}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Switch to {themeMode === "dark" ? "Light" : "Dark"} Mode
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by Unitech Forge</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
