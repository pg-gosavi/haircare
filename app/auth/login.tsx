import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '@/constants/Colors';
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { setIsLoggedIn, setUserRole } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRole = () => {
    setIsDoctor(!isDoctor);
  };

  const handleLogin = async () => {
    // Simple validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    // In a real app, you would validate credentials against a backend
    // For this demo, we'll just simulate a successful login
    try {
      const userRole = isDoctor ? 'doctor' : 'patient';
      
      // Store user session
      await AsyncStorage.setItem('userToken', 'demo-token');
      await AsyncStorage.setItem('userRole', userRole);
      
      // Update auth context
      setIsLoggedIn(true);
      setUserRole(userRole);
      
      // Navigate based on role
      if (userRole === 'doctor') {
        router.replace('/(doctor)/dashboard');
      } else {
        router.replace('/(patient)/dashboard');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Logo size={80} />
            <Text style={styles.title}>HairCare+</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.loginTitle}>Login</Text>
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                  {showPassword ? 
                    <EyeOff size={20} color={COLORS.textMedium} /> : 
                    <Eye size={20} color={COLORS.textMedium} />
                  }
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              onPress={() => router.push('/auth/forgot-password')}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.roleToggleContainer}>
              <Text style={styles.roleToggleLabel}>Login as:</Text>
              <View style={styles.roleButtonsContainer}>
                <TouchableOpacity 
                  style={[styles.roleButton, !isDoctor && styles.activeRoleButton]}
                  onPress={() => setIsDoctor(false)}
                >
                  <Text style={[styles.roleButtonText, !isDoctor && styles.activeRoleButtonText]}>
                    Patient
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.roleButton, isDoctor && styles.activeRoleButton]}
                  onPress={() => setIsDoctor(true)}
                >
                  <Text style={[styles.roleButtonText, isDoctor && styles.activeRoleButtonText]}>
                    Doctor/Staff
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: COLORS.textDark,
    marginTop: 12,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loginTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: COLORS.textDark,
    marginBottom: 24,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    color: COLORS.error,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textMedium,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textDark,
  },
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textDark,
  },
  eyeIcon: {
    padding: 12,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
  },
  roleToggleContainer: {
    marginBottom: 24,
  },
  roleToggleLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textMedium,
    marginBottom: 8,
  },
  roleButtonsContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  activeRoleButton: {
    backgroundColor: COLORS.primary,
  },
  roleButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textMedium,
  },
  activeRoleButtonText: {
    color: COLORS.white,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.white,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  signupText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
  },
  signupLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: COLORS.primary,
  },
});