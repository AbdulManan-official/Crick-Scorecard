import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../themes/theme';

export default function HomeScreen({ navigation }) {
  const theme = useAppTheme();

  const imageSource =
    theme.colors.background === '#121212'
      ? require('../assets/3d.png')
      : require('../assets/3.png');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
      justifyContent: 'center',
    },
    content: {
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 150,
      resizeMode: 'contain',
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.normal,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      width: '100%',
      marginBottom: theme.spacing.md,
      ...theme.shadow.small,
    },
    buttonText: {
      color: theme.colors.buttonText,
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.semibold,
    },
    secondaryButton: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    secondaryButtonText: {
      color: theme.colors.text,
    },
    footer: {
      alignItems: 'center',
      marginTop: theme.spacing.lg,
    },
    footerText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={imageSource} style={styles.image} />

        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          Create matches, track your history, and manage players with ease.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CreateMatch')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Create a Match</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('History')}
          activeOpacity={0.85}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Match History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.85}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Register
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by Unitech Forge</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
