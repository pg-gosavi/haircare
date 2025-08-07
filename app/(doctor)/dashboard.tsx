import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { UserPlus, User, Search, Filter, Clock } from 'lucide-react-native';
import PatientCard from '@/components/doctor/PatientCard';
import { mockPatients } from '@/data/mockData';

export default function DoctorDashboard() {
  const router = useRouter();
  const [patients, setPatients] = useState(mockPatients);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'nashik', 'pune', 'bhusawal'

  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, fetch fresh data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredPatients = filter === 'all' 
    ? patients 
    : patients.filter(patient => patient.location.toLowerCase() === filter);

  const renderFilterButton = (label: string, value: string) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === value && styles.filterButtonActive]}
      onPress={() => setFilter(value)}
    >
      <Text 
        style={[styles.filterButtonText, filter === value && styles.filterButtonTextActive]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Dr. Smith</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100' }} 
            style={styles.avatarImage} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{patients.length}</Text>
          <Text style={styles.statLabel}>Total Patients</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Today's Appointments</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>New Patients</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/(doctor)/patients/new')}
        >
          <UserPlus size={20} color={COLORS.white} />
          <Text style={styles.actionButtonText}>New Patient</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/(doctor)/patients/search')}
        >
          <Search size={20} color={COLORS.white} />
          <Text style={styles.actionButtonText}>Find Patient</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/(doctor)/appointments')}
        >
          <Clock size={20} color={COLORS.white} />
          <Text style={styles.actionButtonText}>Appointments</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.patientsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Patients</Text>
          <TouchableOpacity onPress={() => router.push('/(doctor)/patients/search')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filtersContainer}>
          <View style={styles.filterIcon}>
            <Filter size={16} color={COLORS.textMedium} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderFilterButton('All', 'all')}
            {renderFilterButton('Nashik', 'nashik')}
            {renderFilterButton('Pune', 'pune')}
            {renderFilterButton('Bhusawal', 'bhusawal')}
          </ScrollView>
        </View>
        
        <FlatList
          data={filteredPatients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PatientCard 
              patient={item} 
              onPress={() => router.push({
                pathname: '/(doctor)/patients/[id]',
                params: { id: item.id }
              })}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <User size={40} color={COLORS.textLight} />
              <Text style={styles.emptyStateText}>No patients found</Text>
            </View>
          }
          contentContainerStyle={styles.patientsList}
        />
      </View>
    </View>
  );
}

// Import at the top of the file
import { ScrollView } from 'react-native';

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 22,
    color: COLORS.white,
    marginBottom: 4,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  stats: {
    flexDirection: 'row',
    marginTop: -24,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textMedium,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: COLORS.white,
    marginLeft: 6,
  },
  patientsSection: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: COLORS.textDark,
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
  },
  patientsList: {
    paddingBottom: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.textMedium,
    marginTop: 12,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  filterIcon: {
    marginRight: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primaryLight,
  },
  filterButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textMedium,
  },
  filterButtonTextActive: {
    color: COLORS.primary,
  },
});