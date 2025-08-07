import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { ArrowLeft, Search, User, MapPin, Phone } from 'lucide-react-native';
import { mockPatients } from '@/data/mockData';

export default function SearchPatientScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(mockPatients);
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setResults(mockPatients);
    } else {
      const filtered = mockPatients.filter(patient => 
        patient.name.toLowerCase().includes(text.toLowerCase()) ||
        patient.phone.includes(text)
      );
      setResults(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Patient</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.textMedium} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or phone number"
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
        </View>

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.patientCard}
              onPress={() => router.push({
                pathname: '/(doctor)/patients/[id]',
                params: { id: item.id }
              })}
            >
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>{item.name}</Text>
                <View style={styles.patientMeta}>
                  <View style={styles.metaItem}>
                    <User size={14} color={COLORS.textMedium} />
                    <Text style={styles.metaText}>{item.age} yrs, {item.gender}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <MapPin size={14} color={COLORS.textMedium} />
                    <Text style={styles.metaText}>{item.location}</Text>
                  </View>
                </View>
                <View style={styles.metaItem}>
                  <Phone size={14} color={COLORS.textMedium} />
                  <Text style={styles.metaText}>{item.phone}</Text>
                </View>
              </View>
              <Text style={styles.lastVisit}>
                Last visit: {item.lastVisit}
              </Text>
            </TouchableOpacity>
          )}
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
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: COLORS.white,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: -16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textDark,
  },
  patientsList: {
    paddingBottom: 24,
  },
  patientCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  patientInfo: {
    marginBottom: 8,
  },
  patientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  patientMeta: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
    marginLeft: 4,
  },
  lastVisit: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
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
});