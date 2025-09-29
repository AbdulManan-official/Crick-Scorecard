import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getThemeObjects } from '../themes/theme';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ({ themeMode }) => {
  const navigation = useNavigation();

  // Get both light and dark themes
  const { lightTheme, darkTheme } = getThemeObjects();
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  // Select illustration image based on theme
  const illustrationSource =
    themeMode === 'dark'
      ? require('../assets/2.png') // Dark mode image
      : require('../assets/2b.png'); // Light mode image

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },
    illustration: {
      width: '60%',           // scale with screen width
      maxWidth: 300,          // prevent over-expansion on tablets
      height: undefined,      // auto-calculated from aspectRatio
      aspectRatio: 1.2,       // keeps proper shape
      resizeMode: 'contain',
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.lg,
      alignSelf: 'center',
    },
    welcomeText: {
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    descriptionText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.xl,
      lineHeight: theme.fontSize.md * 1.6,
      maxWidth: '90%',
    },
    button: {
      width: '100%',
      maxWidth: 400, // keeps buttons neat on large screens
      paddingVertical: theme.spacing.md,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.md,
      ...theme.shadow.small,
    },
    buttonText: {
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.buttonText,
    },
    buttonOutline: {
      width: '100%',
      maxWidth: 400,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: theme.colors.primary,
      marginBottom: theme.spacing.md,
    },
    buttonOutlineText: {
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration Image */}
        <Image source={illustrationSource} style={styles.illustration} />

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome</Text>

        {/* Description Text */}
        <Text style={styles.descriptionText}>
          Hi there!{"\n"}
          We're here to help you track your scores.
          The choice is yours! Log in or create an account.
        </Text>

        {/* Create Account Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        {/* Log In Button */}
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.buttonOutlineText}>Log In</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
