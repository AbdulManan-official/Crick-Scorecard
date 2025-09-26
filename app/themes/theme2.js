import { useColorScheme } from "react-native";

export const useAppTheme = () => {
  const colorScheme = useColorScheme();

  const lightTheme = {
    colors: {
      primary: "#1E88E5",      // Vibrant blue
      secondary: "#F4511E",    // Deep orange
      background: "#F5F5F5",   // Light gray background
      surface: "#FFFFFF",      // Cards, modals
      text: "#212121",         // Main text
      textSecondary: "#757575",// Secondary text
      border: "#E0E0E0",       // Light border
      card: "#FFFFFF",         // Card background
      success: "#43A047",      // Green
      warning: "#FB8C00",      // Amber
      error: "#E53935",        // Red
      shadow: "#000000",       // Shadow color
      buttonText: "#FFFFFF",   // Text on primary buttons
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
      medium: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        elevation: 6,
      },
      large: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 6.27,
        elevation: 10,
      },
    },
  };

  const darkTheme = {
    colors: {
      primary: "#42A5F5",      // Lighter blue for dark
      secondary: "#FF7043",    // Soft orange
      background: "#121212",   // Dark background
      surface: "#1E1E1E",      // Card background
      text: "#FFFFFF",         // White text
      textSecondary: "#B0B0B0",// Secondary text
      border: "#2C2C2C",       // Dark border
      card: "#1E1E1E",         // Card background
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
      medium: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      },
      large: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 6.27,
        elevation: 12,
      },
    },
  };

  return colorScheme === "dark" ? darkTheme : lightTheme;
};
