import { useColorScheme } from "react-native";

export const useAppTheme = () => {
  const colorScheme = useColorScheme();

  const lightTheme = {
    colors: {
      primary: "#E53935",      // Vibrant red
      secondary: "#3949AB",    // Indigo
      background: "#FAFAFA",   // Almost white background
      surface: "#FFFFFF",      // Card/surface
      text: "#212121",         // Strong black text
      textSecondary: "#616161",// Muted gray text
      border: "#E0E0E0",       // Light gray borders
      card: "#FFFFFF",         // Card background
      success: "#43A047",      // Green
      warning: "#FB8C00",      // Amber/Orange
      error: "#D32F2F",        // Deep red
      shadow: "#000000",       // Shadows
      buttonText: "#FFFFFF",   // White text on primary buttons
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
    },
    fontSize: {
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    shadow: {
      small: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 3,
      },
    },
  };

  const darkTheme = {
    colors: {
      primary: "#FF5252",      // Softer red for dark mode
      secondary: "#7986CB",    // Light indigo
      background: "#121212",   // Dark background
      surface: "#1E1E1E",      // Card/surface
      text: "#FFFFFF",         // White text
      textSecondary: "#B0B0B0",// Muted gray
      border: "#2C2C2C",       // Subtle dark border
      card: "#1E1E1E",
      success: "#66BB6A",      // Green
      warning: "#FFA726",      // Amber
      error: "#EF5350",        // Red
      shadow: "#000000",
      buttonText: "#FFFFFF",
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
    },
    fontSize: {
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    shadow: {
      small: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    },
  };

  return colorScheme === "dark" ? darkTheme : lightTheme;
};
