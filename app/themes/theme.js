// theme.js

export const LightTheme = {
  name: "light",
  colors: {
    primary: "#1E88E5",
    secondary: "#FFC107",
    background: "#FFFFFF",
    card: "#F5F5F5",
    text: "#212121",
    textSecondary: "#757575",
    border: "#E0E0E0",
    success: "#4CAF50",
    error: "#E53935",
    notification: "#FF5722",
    highlight: "#BBDEFB",
     textInverse: "#FFFFFF", 
  },
  statusBar: "dark-content",
};

export const DarkTheme = {
  name: "dark",
  colors: {
    primary: "#90CAF9",
    secondary: "#FFD54F",
    background: "#121212",
    card: "#1E1E1E",
    text: "#FFFFFF",
    textInverse: "#000000",
    textSecondary: "#BDBDBD",
    border: "#333333",
    success: "#81C784",
    error: "#EF5350",
    notification: "#FF8A65",
    highlight: "#37474F",
  },
  statusBar: "light-content",
};

// Optional: existing themes object
export const themes = { light: LightTheme, dark: DarkTheme };
