// ../themes/theme.js
import { useColorScheme } from "react-native";

// Enhanced theme configuration with additional design tokens
export const getThemeObjects = () => {
  const lightTheme = {
    colors: {
      primary: "#E53935",
      primaryLight: "#FF6659",
      primaryDark: "#AB000D",
      secondary: "#3949AB",
      secondaryLight: "#6F74DD",
      secondaryDark: "#00227B",
      background: "#FAFAFA",
      surface: "#FFFFFF",
      surfaceVariant: "#F5F5F5", // Added surface variant
      text: "#212121",
      textSecondary: "#616161",
      textTertiary: "#9E9E9E", // Added tertiary text
      border: "#E0E0E0",
      borderLight: "#F0F0F0", // Added light border
      card: "#FFFFFF",
      success: "#43A047",
      successLight: "#76D275",
      warning: "#FB8C00",
      warningLight: "#FFCC02",
      error: "#D32F2F",
      errorLight: "#FF6659",
      info: "#2196F3", // Added info color
      infoLight: "#64B5F6",
      shadow: "#000000",
      buttonText: "#FFFFFF",
      overlay: "rgba(0, 0, 0, 0.5)", // Added overlay
      disabled: "#BDBDBD", // Added disabled state
      placeholder: "#9E9E9E", // Added placeholder color
    },
    spacing: { 
      xs: 4, 
      sm: 8, 
      md: 16, 
      lg: 24, 
      xl: 32,
      xxl: 48, // Added extra large spacing
    },
    borderRadius: { 
      xs: 4, // Added extra small radius
      sm: 8, 
      md: 12, 
      lg: 16,
      xl: 24, // Added extra large radius
      full: 9999, // Added full radius for pills
    },
    fontSize: { 
      xs: 12, // Added extra small
      sm: 14, 
      md: 16, 
      lg: 18, 
      xl: 24, 
      xxl: 32,
      xxxl: 40, // Added extra large
    },
    fontWeight: { 
      light: "300", // Added light weight
      normal: "400", 
      medium: "500", 
      semibold: "600", 
      bold: "700",
      extraBold: "800", // Added extra bold
    },
    lineHeight: { // Added line heights
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
    opacity: { // Added opacity values
      disabled: 0.38,
      hover: 0.04,
      focus: 0.12,
      selected: 0.08,
      pressed: 0.16,
    },
    shadow: {
      none: {}, // Added no shadow option
      small: { 
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.15, 
        shadowRadius: 3.84, 
        elevation: 3 
      },
      medium: { 
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 4.65, 
        elevation: 6 
      },
      large: { 
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 6 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 6.27, 
        elevation: 10 
      },
      extraLarge: { // Added extra large shadow
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 10 }, 
        shadowOpacity: 0.35, 
        shadowRadius: 8.84, 
        elevation: 15 
      },
    },
    animation: { // Added animation durations
      fast: 150,
      normal: 300,
      slow: 500,
    },
    breakpoints: { // Added responsive breakpoints
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  };

  const darkTheme = {
    colors: {
      primary: "#FF5252",
      primaryLight: "#FF867C",
      primaryDark: "#C50E29",
      secondary: "#7986CB",
      secondaryLight: "#AAB6FE",
      secondaryDark: "#49599A",
      background: "#121212",
      surface: "#1E1E1E",
      surfaceVariant: "#2C2C2C",
      text: "#FFFFFF",
      textSecondary: "#B0B0B0",
      textTertiary: "#757575",
      border: "#2C2C2C",
      borderLight: "#3C3C3C",
      card: "#1E1E1E",
      success: "#66BB6A",
      successLight: "#98EE99",
      warning: "#FFA726",
      warningLight: "#FFD95A",
      error: "#EF5350",
      errorLight: "#FF867C",
      info: "#42A5F5",
      infoLight: "#80D6FF",
      shadow: "#000000",
      buttonText: "#FFFFFF",
      overlay: "rgba(0, 0, 0, 0.7)",
      disabled: "#424242",
      placeholder: "#757575",
    },
    spacing: { 
      xs: 4, 
      sm: 8, 
      md: 16, 
      lg: 24, 
      xl: 32,
      xxl: 48,
    },
    borderRadius: { 
      xs: 4,
      sm: 8, 
      md: 12, 
      lg: 16,
      xl: 24,
      full: 9999,
    },
    fontSize: { 
      xs: 12,
      sm: 14, 
      md: 16, 
      lg: 18, 
      xl: 24, 
      xxl: 32,
      xxxl: 40,
    },
    fontWeight: { 
      light: "300",
      normal: "400", 
      medium: "500", 
      semibold: "600", 
      bold: "700",
      extraBold: "800",
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
    opacity: {
      disabled: 0.38,
      hover: 0.04,
      focus: 0.12,
      selected: 0.08,
      pressed: 0.16,
    },
    shadow: {
      none: {},
      small: { 
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
        elevation: 5 
      },
      medium: { 
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 4.65, 
        elevation: 8 
      },
      large: { 
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 6 }, 
        shadowOpacity: 0.35, 
        shadowRadius: 6.27, 
        elevation: 12 
      },
      extraLarge: {
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 10 }, 
        shadowOpacity: 0.4, 
        shadowRadius: 8.84, 
        elevation: 18 
      },
    },
    animation: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    breakpoints: {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  };

  return { lightTheme, darkTheme };
};

// Hook for getting the current theme based on system preference
export const useAppTheme = () => {
  const colorScheme = useColorScheme();
  const { lightTheme, darkTheme } = getThemeObjects();
  return colorScheme === "dark" ? darkTheme : lightTheme;
};

// Hook for getting both themes (useful for theme switching components)
export const useThemes = () => {
  return getThemeObjects();
};

// Utility function to create theme-aware styles
export const createThemedStyles = (styleFunction) => {
  return (theme) => styleFunction(theme);
};

// Helper function to get color with opacity
export const withOpacity = (color, opacity) => {
  if (color.includes('rgba')) return color;
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

