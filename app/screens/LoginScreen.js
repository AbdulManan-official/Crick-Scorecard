import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput as PaperTextInput, Button, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getThemeObjects } from '../themes/theme';

// Import Firebase core and specific functions
import { auth } from '../FirebaseConfig'; // Import auth from your FirebaseConfig
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword

const facebookIcon = require('../assets/f.png');
const googleIcon = require('../assets/g.png');

// Get screen dimensions for responsive styling
const { height } = Dimensions.get('window');

const LoginScreen = ({ themeMode }) => {
  const navigation = useNavigation();
  const { lightTheme, darkTheme } = getThemeObjects();
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // State for potential validation errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState(''); // New state for general login errors

  const handleLogin = async () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setGeneralError(''); // Clear general error on new attempt

    // Client-side email validation
    if (!email.trim()) {
      setEmailError('Email cannot be empty.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // Client-side password validation
    if (!password.trim()) {
      setPasswordError('Password cannot be empty.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    if (!isValid) {
      // If any client-side validation fails, stop here
      return;
    }

    setLoading(true); // Start loading

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      // If successful, navigate to the desired screen
      Alert.alert('Success', 'Logged in successfully!');
      // For example: navigation.navigate('HomeScreen');
    } catch (error) {
      // --- CHANGE HERE: Removed or commented out console.error ---
      // console.error('Firebase Auth Error (Login):', error.code, error.message);
      // If you truly want to hide it completely even from dev tools, ensure this line is removed.
      // If you want it only for your own debugging, you could wrap it in an __DEV__ check:
      // if (__DEV__) {
      //   console.error('Firebase Auth Error (Login):', error.code, error.message);
      // }


      let userFriendlyMessage = 'Login failed. Please check your credentials and try again.'; // Default generic message

      switch (error.code) {
        case 'auth/invalid-email':
          userFriendlyMessage = 'The email address is not valid.';
          setEmailError(userFriendlyMessage);
          break;
        case 'auth/user-disabled':
          userFriendlyMessage = 'This account has been disabled. Please contact support.';
          setGeneralError(userFriendlyMessage);
          break;
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          // Combine all invalid credential errors into one general message for security
          userFriendlyMessage = 'Invalid email or password. Please try again.';
          setEmailError(userFriendlyMessage); // Set error on email field for immediate visibility
          setPasswordError(''); // Clear password error if it was specific, now general
          break;
        default:
          userFriendlyMessage = 'An unexpected error occurred. Please try again later.';
          setGeneralError(userFriendlyMessage);
          break;
      }
    } finally {
      setLoading(false); // End loading
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

            {/* General Error Display (if any) */}
            {!!generalError && <Text style={[styles.generalErrorText, { color: theme.colors.error }]}>{generalError}</Text>}

            {/* Email Input */}
            <PaperTextInput
              label="Email"
              value={email}
              onChangeText={(text) => { setEmail(text); setEmailError(''); setGeneralError(''); }}
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
            />
            {!!emailError && <Text style={[styles.errorText, { color: theme.colors.error }]}>{emailError}</Text>}


            {/* Password Input */}
            <PaperTextInput
              label="Password"
              value={password}
              onChangeText={(text) => { setPassword(text); setPasswordError(''); setGeneralError(''); }}
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
              loading={loading}
              disabled={loading}
              style={[styles.loginButton, {
                marginTop: theme.spacing.md,
                borderRadius: theme.borderRadius.md,
                backgroundColor: loading ? theme.colors.textSecondary : theme.colors.primary,
                ...theme.shadow.medium,
              }]}
              contentStyle={{ paddingVertical: theme.spacing.sm }}
              labelStyle={{
                color: theme.colors.buttonText,
                fontSize: theme.fontSize.md,
                fontWeight: theme.fontWeight.bold,
              }}
            >
              {loading ? 'Logging In...' : 'Log In'}
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
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  contentContainer: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 400,
    paddingVertical: height * 0.02,
  },
  title: {
    fontWeight: '700',
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  input: {
    marginBottom: height * 0.005,
    width: '100%',
  },
  errorText: {
    marginBottom: height * 0.015,
    fontSize: 12,
    textAlign: 'left',
    paddingLeft: 12,
  },
  generalErrorText: {
    marginBottom: height * 0.015,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontWeight: '500',
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
    marginTop: height * 0.01,
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
    marginVertical: height * 0.03,
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
    marginBottom: height * 0.02,
    fontWeight: '500'
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.03,
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
    marginTop: 'auto',
  }
});

export default LoginScreen;