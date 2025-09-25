// theme.js
// Professional Light & Dark theme for Cricket Scoring App with StatusBar

const LightTheme = {
  name: "light",
  colors: {
    // Core
    primary: "#1976D2",      // Strong Blue (buttons, highlights, key actions)
    secondary: "#FFB300",    // Amber (milestones, notifications badge)
    background: "#FFFFFF",   // App background
    surface: "#F9FAFB",      // Cards, containers, score panels

    // Text
    textPrimary: "#1F2937",  // Dark gray (main text)
    textSecondary: "#6B7280",// Muted gray (secondary info)
    textInverse: "#FFFFFF",  // On dark surfaces or primary buttons

    // Borders / Lines
    border: "#E5E7EB",       // Neutral divider/border

    // Feedback
    success: "#2E7D32",      // Green (milestones, 50/100, win)
    error: "#D32F2F",        // Red (wickets, errors, lost match)
    warning: "#ED6C02",      // Orange (low overs, warnings)
    info: "#0288D1",         // Light Blue (general updates)

    // Extras
    notification: "#EF6C00", // Toasts, push notifications
    highlight: "#E3F2FD",    // Highlighted/selected state
  },
  statusBar: "dark-content", // Dark icons for light background
};

const DarkTheme = {
  name: "dark",
  colors: {
    // Core
    primary: "#90CAF9",      // Soft Blue for dark background
    secondary: "#FFD54F",    // Amber (same role as above)
    background: "#121212",   // App background (dark)
    surface: "#1E1E1E",      // Cards, containers

    // Text
    textPrimary: "#F5F5F5",  // White (main text)
    textSecondary: "#B0BEC5",// Muted gray-blue (secondary info)
    textInverse: "#000000",  // On light surfaces

    // Borders / Lines
    border: "#333333",       // Dark divider

    // Feedback
    success: "#81C784",      // Green (milestones, win)
    error: "#EF5350",        // Red (wickets, errors)
    warning: "#FFB74D",      // Orange (warnings)
    info: "#4FC3F7",         // Blue (updates)

    // Extras
    notification: "#FF8A65", // Toasts, push notifications
    highlight: "#263238",    // Highlighted/selected state
  },
  statusBar: "light-content", // Light icons for dark background
};

// Export both and function to get current theme
export const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

export function getTheme(mode = "light") {
  return themes[mode] || themes.light;
}
