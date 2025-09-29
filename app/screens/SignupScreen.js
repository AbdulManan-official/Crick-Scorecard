import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput as PaperTextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getThemeObjects } from '../themes/theme';

const facebookIcon = require('../assets/f.png');
const googleIcon = require('../assets/g.png');

const SignUpScreen = ({ themeMode }) => {
  const navigation = useNavigation();
  const { lightTheme, darkTheme } = getThemeObjects();
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleSignUp = () => {
    console.log('Sign Up Pressed:', { fullName, email, password });
  };

  // Fixed theme for PaperTextInput with proper dark mode support
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: theme.spacing.lg }}
          keyboardShouldPersistTaps="handled"
        >
          <View>
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
              onChangeText={setFullName}
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
            />

            {/* Email */}
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

            {/* Password */}
            <PaperTextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
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
            />

            <Button
              mode="contained"
              onPress={handleSignUp}
              style={{
                marginTop: theme.spacing.md,
                borderRadius: theme.borderRadius.md,
                backgroundColor: theme.colors.primary,
                ...theme.shadow.medium,
              }}
              contentStyle={{ paddingVertical: theme.spacing.sm }}
              labelStyle={{
                color: theme.colors.buttonText,
                fontSize: theme.fontSize.md,
                fontWeight: theme.fontWeight.bold,
              }}
            >
              Sign Up
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: { fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  subtitle: { marginBottom: 24, textAlign: 'center' },
  input: { marginBottom: 16 },
  orContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  line: { flex: 1, height: 1 },
  orText: { marginHorizontal: 10, textAlign: 'center' },
  socialButtonsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  socialButton: { width: 50, height: 50, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 },
  socialIcon: { width: 30, height: 30, resizeMode: 'contain' },
});

export default SignUpScreen;