import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Image, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput as PaperTextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getThemeObjects } from '../themes/theme';

// Import Firebase core and specific functions
import { auth, db } from '../FirebaseConfig'; // Import auth and db (Firestore)
import { sendPasswordResetEmail } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore functions

const forgotPasswordLightImage = require('../assets/fb.png');
const forgotPasswordDarkImage = require('../assets/fg.png');

const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = ({ themeMode }) => {
  const navigation = useNavigation();
  const { lightTheme, darkTheme } = getThemeObjects();
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleResetPassword = async () => {
    setEmailError(''); // Clear previous errors
    if (!email.trim()) {
      setEmailError('Email cannot be empty.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      // 1. Check if the email exists in your "Users" collection
      const usersRef = collection(db, 'Users'); // Assuming your collection is named 'Users'
      const q = query(usersRef, where('email', '==', email.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // If no user with that email is found in your collection
        Alert.alert('Error', 'No account found with that email. Please register first.');
      } else {
        // If email exists in your Users collection, send the password reset link
        await sendPasswordResetEmail(auth, email.trim());
        Alert.alert(
          'Password Reset',
          'A password reset link has been sent to your email. Please check your inbox (and spam folder).'
        );
        setEmail(''); // Clear the email field
        navigation.goBack(); // Optionally navigate back to login
      }
    } catch (error) {
      console.error('Password Reset Error:', error.code, error.message);
      let userFriendlyMessage = 'Failed to send password reset email. Please try again.';

      switch (error.code) {
        case 'auth/invalid-email':
          userFriendlyMessage = 'The email address is not valid.';
          setEmailError(userFriendlyMessage);
          break;
        case 'auth/user-not-found': // Firebase Auth might still return this even after Firestore check, if the user doesn't exist in Auth
          userFriendlyMessage = 'No account found with that email. Please register first.';
          setEmailError(userFriendlyMessage);
          break;
        default:
          userFriendlyMessage = 'An unexpected error occurred. Please try again later.';
          setEmailError(userFriendlyMessage); // Show general error on email field
          break;
      }
      Alert.alert('Error', userFriendlyMessage);
    } finally {
      setLoading(false);
    }
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
      error: theme.colors.error, // Error text color for PaperTextInput
    },
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
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
            onChangeText={(text) => { setEmail(text); setEmailError(''); }} // Clear error on text change
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
            error={!!emailError} // Show error state for the input
          />
          {!!emailError && <Text style={[styles.errorText, { color: theme.colors.error }]}>{emailError}</Text>}

          {/* Reset Password Button */}
          <Button
            mode="contained"
            onPress={handleResetPassword}
            loading={loading}
            disabled={loading}
            style={[
              styles.resetButton,
              {
                backgroundColor: loading ? theme.colors.textSecondary : theme.colors.primary,
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
            {loading ? 'Sending Link...' : 'Reset Password'}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  errorText: {
    color: 'red', // Define a default error text color
    fontSize: 12,
    alignSelf: 'flex-start',
    paddingLeft: 12, // Align with input label
    marginBottom: height * 0.015,
    width: '100%',
    maxWidth: 350,
  },
  resetButton: {
    width: '100%',
    maxWidth: 350,
  },
});

export default ForgotPasswordScreen;