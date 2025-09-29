import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput as PaperTextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getThemeObjects } from '../themes/theme';

const forgotPasswordLightImage = require('../assets/fb.png');
const forgotPasswordDarkImage = require('../assets/fg.png');

const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = ({ themeMode }) => {
  const navigation = useNavigation();
  const { lightTheme, darkTheme } = getThemeObjects();
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    console.log('Reset Password Pressed:', { email });
    // You can add your reset password logic here
    // For example, navigate back or show success message
  };

  // Theme for PaperTextInput with proper dark mode support
  const inputTheme = {
    colors: {
      primary: theme.colors.primary, // Active/focused border and label color
      onSurface: themeMode === 'dark' ? '#FFFFFF' : theme.colors.text, // Label color when not focused
      onSurfaceVariant: themeMode === 'dark' ? '#FFFFFF' : theme.colors.textSecondary, // Placeholder color
      outline: themeMode === 'dark' ? '#555555' : theme.colors.border, // Border color when not focused
      surface: theme.colors.surface, // Background color
      surfaceVariant: theme.colors.surfaceVariant, // Input background
      text: themeMode === 'dark' ? '#FFFFFF' : theme.colors.text, // Input text color
    },
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust this value if needed
      >
        <View style={styles.contentContainer}>
          {/* Forgot Password Image */}
          <View style={styles.imageContainer}>
            <Image
              source={themeMode === 'dark' ? forgotPasswordDarkImage : forgotPasswordLightImage}
              style={styles.forgotPasswordImage}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: theme.colors.text, fontSize: theme.fontSize.xxl }]}>
            Forgot Password?
          </Text>

          {/* Subtitle */}
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.textSecondary,
                fontSize: theme.fontSize.md,
                lineHeight: theme.lineHeight.relaxed * theme.fontSize.md,
              },
            ]}
          >
            Don't worry, just enter your email
          </Text>

          {/* Email Input */}
          <PaperTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            left={<PaperTextInput.Icon icon="email" iconColor={themeMode === 'dark' ? '#FFFFFF' : theme.colors.textSecondary} />}
            style={[
              styles.input,
              {
                borderRadius: theme.borderRadius.md,
                backgroundColor: theme.colors.surfaceVariant,
              }
            ]}
            contentStyle={{
              color: themeMode === 'dark' ? '#FFFFFF' : theme.colors.text,
            }}
            placeholder="Enter your email"
            placeholderTextColor={themeMode === 'dark' ? '#CCCCCC' : theme.colors.placeholder}
            theme={inputTheme}
            textColor={themeMode === 'dark' ? '#FFFFFF' : theme.colors.text}
          />

          {/* Reset Password Button */}
          <Button
            mode="contained"
            onPress={handleResetPassword}
            style={[
              styles.resetButton,
              {
                backgroundColor: theme.colors.primary,
                borderRadius: theme.borderRadius.md,
                marginTop: theme.spacing.lg,
                ...theme.shadow.medium,
              }
            ]}
            contentStyle={{
              paddingVertical: theme.spacing.sm,
              height: 56
            }}
            labelStyle={{
              color: theme.colors.buttonText,
              fontSize: theme.fontSize.md,
              fontWeight: theme.fontWeight.bold,
            }}
          >
            Reset Password
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',     // Center content horizontally
    paddingHorizontal: 20,    // Add some horizontal padding
    paddingBottom: 20,        // Add padding at the bottom to prevent content from being too close to the edge
  },
  imageContainer: {
    marginBottom: height * 0.04,
    alignItems: 'center',
    width: '100%',
  },
  forgotPasswordImage: {
    width: Math.min(width * 0.5, 200),
    height: Math.min(width * 0.5, 200),
    maxWidth: 200,
    maxHeight: 200,
  },
  title: {
    fontWeight: '700',
    marginBottom: height * 0.01,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    marginBottom: height * 0.04,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: height * 0.02,
    width: '100%',
    maxWidth: 350,
  },
  resetButton: {
    width: '100%',
    maxWidth: 350,
  },
});

export default ForgotPasswordScreen;