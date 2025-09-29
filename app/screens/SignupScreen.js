import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput as PaperTextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getThemeObjects } from '../themes/theme';

// Import Firebase core and specific functions
import { auth, db } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const facebookIcon = require('../assets/f.png');
const googleIcon = require('../assets/g.png');

const { height } = Dimensions.get('window');

const SignUpScreen = ({ themeMode }) => {
  const navigation = useNavigation();
  const { lightTheme, darkTheme } = getThemeObjects();
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  // State for validation errors
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = async () => {
    // Reset previous errors
    setFullNameError('');
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    // Full Name Validation
    if (!fullName.trim()) {
      setFullNameError('Full Name is required.');
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // Password Validation
    if (!password.trim()) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 8) { // Changed to 8 digits as per request
      setPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    }

    if (!isValid) {
      // If any validation fails, stop here and show errors
      Alert.alert('Validation Error', 'Please correct the errors in the form.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      const user = userCredential.user;

      await setDoc(doc(db, 'Users', user.uid), {
        uid: user.uid,
        name: fullName.trim(),
        email: email.trim(),
        createdAt: new Date(),
      });

      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Register'); // Changed from 'LoginScreen' to 'Register'
    } catch (error) {
      console.error('Sign Up Error:', error.code, error.message);
      let errorMessage = 'Failed to create an account. Please try again.';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already in use. Please try logging in or use a different email.';
        setEmailError(errorMessage); // Set error for email field
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'The email address is invalid. Please enter a valid email.';
        setEmailError(errorMessage); // Set error for email field
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak. Please choose a password with at least 8 characters.';
        setPasswordError(errorMessage); // Set error for password field
      }

      Alert.alert('Sign Up Error', errorMessage);
    } finally {
      setLoading(false); // End loading
    }
  };

  const inputTheme = {
    colors: {
      primary: theme.colors.primary,
      onSurface: themeMode === 'dark' ? '#FFFFFF' : theme.colors.text,
      onSurfaceVariant: themeMode === 'dark' ? '#FFFFFF' : theme.colors.textSecondary,
      outline: themeMode === 'dark' ? '#555555' : theme.colors.border,
      surface: theme.colors.surface,
      surfaceVariant: theme.colors.surfaceVariant,
      text: themeMode === 'dark' ? '#FFFFFF' : theme.colors.text,
      error: theme.colors.error, // Added error color
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
          <Text style={[styles.title, { color: theme.colors.text, fontSize: theme.fontSize.xxl }]}>
            Create Your Account
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
            We're here to help you reach the peaks of learning. Are you ready?
          </Text>

          {/* Full Name */}
          <PaperTextInput
            label="Full Name"
            value={fullName}
            onChangeText={(text) => { setFullName(text); setFullNameError(''); }} // Clear error on change
            mode="outlined"
            left={<PaperTextInput.Icon icon="account" iconColor={themeMode === 'dark' ? '#FFFFFF' : theme.colors.textSecondary} />}
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
            placeholder="Enter your full name"
            placeholderTextColor={themeMode === 'dark' ? '#CCCCCC' : theme.colors.placeholder}
            theme={inputTheme}
            textColor={themeMode === 'dark' ? '#FFFFFF' : theme.colors.text}
            error={!!fullNameError} // Show error state
          />
          {fullNameError ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{fullNameError}</Text> : null}


          {/* Email */}
          <PaperTextInput
            label="Email"
            value={email}
            onChangeText={(text) => { setEmail(text); setEmailError(''); }} // Clear error on change
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
            error={!!emailError} // Show error state
          />
          {emailError ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{emailError}</Text> : null}


          {/* Password */}
          <PaperTextInput
            label="Password"
            value={password}
            onChangeText={(text) => { setPassword(text); setPasswordError(''); }} // Clear error on change
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
            error={!!passwordError} // Show error state
          />
          {passwordError ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{passwordError}</Text> : null}

          <Button
            mode="contained"
            onPress={handleSignUp}
            loading={loading}
            disabled={loading} // Disable button when loading
            style={[
              styles.signUpButton,
              {
                marginTop: theme.spacing.md,
                borderRadius: theme.borderRadius.md,
                backgroundColor: loading ? theme.colors.textSecondary : theme.colors.primary, // Grey out button when disabled/loading
                ...theme.shadow.medium,
              }
            ]}
            contentStyle={{ paddingVertical: theme.spacing.sm }}
            labelStyle={{
              color: theme.colors.buttonText,
              fontSize: theme.fontSize.md,
              fontWeight: theme.fontWeight.bold,
            }}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>

          <View style={styles.orContainer}>
            <View style={[styles.line, { backgroundColor: theme.colors.textSecondary }]} />
            <Text style={[styles.orText, { color: theme.colors.textSecondary, fontSize: theme.fontSize.sm }]}>OR</Text>
            <View style={[styles.line, { backgroundColor: theme.colors.textSecondary }]} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={[styles.socialButton, { borderColor: theme.colors.border }]} onPress={() => console.log('Facebook Sign Up')}>
              <Image source={facebookIcon} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { borderColor: theme.colors.border }]} onPress={() => console.log('Google Sign Up')}>
              <Image source={googleIcon} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: theme.spacing.md }}>
            <Text style={{ color: theme.colors.text, fontSize: theme.fontSize.md }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: theme.fontSize.md,
                  fontWeight: theme.fontWeight.semibold,
                  marginLeft: theme.spacing.xs,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: height * 0.03,
  },
  title: {
    fontWeight: '700',
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: height * 0.03,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  input: {
    marginBottom: height * 0.015, // Adjusted to make space for error text
    width: '100%',
  },
  errorText: {
    marginTop: -height * 0.01, // Move error text closer to the input
    marginBottom: height * 0.015,
    marginLeft: 10,
    fontSize: 12, // Smaller font for errors
  },
  signUpButton: {
    width: '100%',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  line: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: 10,
    textAlign: 'center',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.02,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default SignUpScreen;