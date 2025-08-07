import { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';
import { COLORS } from '@/constants/Colors';
import Logo from '@/components/ui/Logo';

export default function SplashScreen() {
  const router = useRouter();
  const { isLoggedIn, userRole } = useAuth();

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        // Check if user has completed onboarding
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        
        // Wait for 2 seconds to show splash screen
        setTimeout(() => {
          if (isLoggedIn && userRole) {
            // Navigate based on user role
            if (userRole === 'doctor') {
              router.replace('/(doctor)/dashboard');
            } else {
              router.replace('/(patient)/dashboard');
            }
          } else if (hasSeenOnboarding === 'true') {
            router.replace('/auth/login');
          } else {
            router.replace('/onboarding');
          }
        }, 2000);

      } catch (error) {
        console.error('Error checking onboarding status:', error);
        router.replace('/onboarding');
      }
    };

    checkOnboarding();
  }, []);

  return (
    <View style={styles.container}>
      <Logo size={120} />
      <Text style={styles.title}>HairCare+</Text>
      <Text style={styles.tagline}>Track your treatment. See your progress.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: COLORS.textDark,
    marginTop: 16,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textMedium,
    marginTop: 8,
    textAlign: 'center',
  }
});