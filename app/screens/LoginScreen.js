import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput as PaperTextInput, Button, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getThemeObjects } from '../themes/theme'; // Assuming this path is correct

const facebookIcon = require('../assets/f.png');
const googleIcon = require('../assets/g.png');

// Get screen dimensions for responsive styling
const { height, width } = Dimensions.get('window');

const LoginScreen = ({ themeMode }) => {
  const navigation = useNavigation();
  const { lightTheme, darkTheme } = getThemeObjects();
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  // State for potential validation errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email cannot be empty');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password cannot be empty');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (isValid) {
      console.log('Login Pressed:', { email, password, rememberMe });
      // Perform actual login API call here
      // navigation.navigate('SomeNextScreen');
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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // Adjust this offset based on your design to ensure input is visible
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={[styles.contentWrapper]}>
          <View style={styles.contentContainer}>
            {/* Welcome Back Text */}
            <Text style={[styles.title, { color: theme.colors.text, fontSize: theme.fontSize.xxl }]}>
              Welcome Back
            </Text>
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
              Ready to continue your learning journey?
            </Text>

            {/* Email Input */}
            <PaperTextInput
              label="Email"
              value={email}
              onChangeText={(text) => { setEmail(text); setEmailError(''); }}
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
              error={!!emailError}
              // helperText={emailError} // HelperText takes up space, only show when there's an error
            />
            {!!emailError && <Text style={[styles.errorText, { color: theme.colors.error }]}>{emailError}</Text>}


            {/* Password Input */}
            <PaperTextInput
              label="Password"
              value={password}
              onChangeText={(text) => { setPassword(text); setPasswordError(''); }}
              mode="outlined"
              secureTextEntry={secureText}
              left={<PaperTextInput.Icon icon="lock" iconColor={themeMode === 'dark' ? '#FFFFFF' : theme.colors.textSecondary} />}
              right={
                <PaperTextInput.Icon
                  icon={secureText ? 'eye-off' : 'eye'}
                  onPress={() => setSecureText(!secureText)}
                  iconColor={themeMode === 'dark' ? '#FFFFFF' : theme.colors.textSecondary}
                />
              }
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
              placeholder="Enter your password"
              placeholderTextColor={themeMode === 'dark' ? '#CCCCCC' : theme.colors.placeholder}
              theme={inputTheme}
              textColor={themeMode === 'dark' ? '#FFFFFF' : theme.colors.text}
              error={!!passwordError}
              // helperText={passwordError} // HelperText takes up space, only show when there's an error
            />
            {!!passwordError && <Text style={[styles.errorText, { color: theme.colors.error }]}>{passwordError}</Text>}


            {/* Remember Me and Forgot Password */}
            <View style={styles.rememberForgotContainer}>
              <View style={styles.rememberMeContainer}>
                <Checkbox
                  status={rememberMe ? 'checked' : 'unchecked'}
                  onPress={() => setRememberMe(!rememberMe)}
                  color={theme.colors.primary}
                  uncheckedColor={themeMode === 'dark' ? '#FFFFFF' : theme.colors.textSecondary}
                />
                <Text style={[styles.rememberMeText, { color: theme.colors.text, fontSize: theme.fontSize.sm }]}>
                  Remember me
                </Text>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                <Text
                  style={[
                    styles.forgotPasswordText,
                    {
                      color: theme.colors.primary,
                      fontSize: theme.fontSize.sm,
                      fontWeight: theme.fontWeight.medium,
                    },
                  ]}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <Button
              mode="contained"
              onPress={handleLogin}
              style={[styles.loginButton, {
                marginTop: theme.spacing.md,
                borderRadius: theme.borderRadius.md,
                backgroundColor: theme.colors.primary,
                ...theme.shadow.medium,
              }]}
              contentStyle={{ paddingVertical: theme.spacing.sm }}
              labelStyle={{
                color: theme.colors.buttonText,
                fontSize: theme.fontSize.md,
                fontWeight: theme.fontWeight.bold,
              }}
            >
              Log In
            </Button>

            {/* OR Divider */}
            <View style={styles.orContainer}>
              <View style={[styles.line, { backgroundColor: theme.colors.textSecondary }]} />
              <Text style={[styles.orText, { color: theme.colors.textSecondary, fontSize: theme.fontSize.sm }]}>OR</Text>
              <View style={[styles.line, { backgroundColor: theme.colors.textSecondary }]} />
            </View>

            {/* Social Login Buttons */}
            <Text style={[styles.signInWith, { color: theme.colors.textSecondary, fontSize: theme.fontSize.sm }]}>
              Sign in with
            </Text>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity
                style={[styles.socialButton, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}
                onPress={() => console.log('Facebook Login')}
              >
                <Image source={facebookIcon} style={styles.socialIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}
                onPress={() => console.log('Google Login')}
              >
                <Image source={googleIcon} style={styles.socialIcon} />
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={{ color: theme.colors.text, fontSize: theme.fontSize.md }}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontSize: theme.fontSize.md,
                    fontWeight: theme.fontWeight.semibold,
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20, // Apply horizontal padding here once
    justifyContent: 'center', // Center content vertically within the keyboard-avoiding space
  },
  contentContainer: {
    // This container will just flow its children
    // If you need maximum width for inputs, etc., add maxWidth here
    alignSelf: 'center', // Center content block horizontally
    width: '100%',
    maxWidth: 400, // Optional: Limit width on very large screens
    paddingVertical: height * 0.02, // Add some vertical padding to content
  },
  title: {
    fontWeight: '700',
    marginBottom: height * 0.01, // Responsive margin
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: height * 0.03, // Responsive margin
    textAlign: 'center',
  },
  input: {
    marginBottom: height * 0.005, // Reduced margin to make space for error text
    width: '100%',
  },
  errorText: {
    marginBottom: height * 0.015, // Space between error and next element
    fontSize: 12, // Standard error text size
    textAlign: 'left',
    paddingLeft: 12, // Align with input text
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02, // Responsive margin
    marginTop: height * 0.01, // Small top margin to separate from input/error
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 4,
  },
  forgotPasswordText: {
    textAlign: 'right',
  },
  loginButton: {
    width: '100%',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.03, // Responsive margin
  },
  line: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: 16,
    textAlign: 'center',
    fontWeight: '500'
  },
  signInWith: {
    textAlign: 'center',
    marginBottom: height * 0.02, // Responsive margin
    fontWeight: '500'
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.03, // Responsive margin
    gap: 16
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto', // Pushes this container to the bottom if there's extra space
    // No explicit marginBottom needed here as it's at the very bottom
  }
});

export default LoginScreen;