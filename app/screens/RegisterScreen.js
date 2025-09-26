import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, Button, TextInput, useTheme } from "react-native-paper";

import { useAppTheme } from "../themes/theme";

export default function RegisterScreen({ navigation }) {
  const customTheme = useAppTheme();
  const paperTheme = useTheme();

  const theme = {
    ...paperTheme,
    colors: {
      ...paperTheme.colors,
      ...customTheme.colors,
    },
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleRegister = () => {
    console.log("Registering:", { name, email, password });
    navigation.replace("Home");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Register to start scoring matches
          </Text>

          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
            placeholder="Enter your full name"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            theme={{ colors: { primary: theme.colors.primary, text: theme.colors.text } }}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            theme={{ colors: { primary: theme.colors.primary, text: theme.colors.text } }}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={secureText}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={secureText ? "eye-off" : "eye"}
                onPress={() => setSecureText(!secureText)}
              />
            }
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
            placeholder="Enter your password"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            theme={{ colors: { primary: theme.colors.primary, text: theme.colors.text } }}
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            contentStyle={{ paddingVertical: 8 }}
            labelStyle={{ color: theme.colors.buttonText }}
          >
            Register
          </Button>

          <Button
            onPress={() => navigation.navigate("Home")}
            style={styles.link}
            labelStyle={{ color: theme.colors.secondary }}
          >
            Already have an account? Login
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: 12,
  },
  link: {
    marginTop: 16,
  },
});