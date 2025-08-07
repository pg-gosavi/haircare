import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '@/constants/Colors';
import { Bell, Lock, LogOut, ChevronRight, User, CircleHelp as HelpCircle, CreditCard as Edit } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { setIsLoggedIn, setUserRole } = useAuth();
  
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');
      setIsLoggedIn(false);
      setUserRole(null);
      router.replace('/auth/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: handleLogout, style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>J</Text>
            </View>
            <View>
              <Text style={styles.profileName}>John Smith</Text>
              <Text style={styles.profileEmail}>john.smith@example.com</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Edit size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Account</Text>
        
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: COLORS.primaryLight }]}>
                <User size={18} color={COLORS.primary} />
              </View>
              <Text style={styles.settingsItemText}>Personal Information</Text>
            </View>
            <ChevronRight size={18} color={COLORS.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: COLORS.primaryLight }]}>
                <Lock size={18} color={COLORS.primary} />
              </View>
              <Text style={styles.settingsItemText}>Change Password</Text>
            </View>
            <ChevronRight size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Notifications</Text>
        
        <View style={styles.settingsCard}>
          <View style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: COLORS.warningLight }]}>
                <Bell size={18} color={COLORS.warning} />
              </View>
              <Text style={styles.settingsItemText}>Push Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
              thumbColor={pushNotifications ? COLORS.primary : COLORS.textLight}
              onValueChange={setPushNotifications}
              value={pushNotifications}
            />
          </View>
          
          <View style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: COLORS.warningLight }]}>
                <Bell size={18} color={COLORS.warning} />
              </View>
              <Text style={styles.settingsItemText}>Email Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
              thumbColor={emailNotifications ? COLORS.primary : COLORS.textLight}
              onValueChange={setEmailNotifications}
              value={emailNotifications}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Support</Text>
        
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: COLORS.successLight }]}>
                <HelpCircle size={18} color={COLORS.success} />
              </View>
              <Text style={styles.settingsItemText}>Help & Support</Text>
            </View>
            <ChevronRight size={18} color={COLORS.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingsItem}
            onPress={confirmLogout}
          >
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: COLORS.errorLight }]}>
                <LogOut size={18} color={COLORS.error} />
              </View>
              <Text style={[styles.settingsItemText, { color: COLORS.error }]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.versionText}>HairCare+ v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: COLORS.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: COLORS.white,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
  },
  editProfileButton: {
    padding: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.textMedium,
    marginBottom: 8,
    marginLeft: 4,
  },
  settingsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textDark,
  },
  appInfo: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 16,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textLight,
  },
});