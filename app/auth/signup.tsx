import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import Logo from '@/components/ui/Logo';
import { Eye, EyeOff } from 'lucide-react-native';

export default function SignupScreen() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
    // Simple validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill all fields');
      return;
    }

    // In a real app, you would register the user in the backend
    // For this demo, we'll just navigate to login
    router.replace('/auth/login');
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
            <Text style={styles.signupTitle}>Create Account</Text>
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
              />
            </View>

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
                  placeholder="Create a password"
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

            <View style={styles.roleToggleContainer}>
              <Text style={styles.roleToggleLabel}>Register as:</Text>
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
              style={styles.signupButton} 
              onPress={handleSignup}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <Text style={styles.loginLink}>Login</Text>
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
  signupTitle: {
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
  signupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  signupButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.white,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
  },
  loginLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: COLORS.primary,
  },
});