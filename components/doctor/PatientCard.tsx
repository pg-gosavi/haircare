import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { User, MapPin, Phone } from 'lucide-react-native';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  phone: string;
  lastVisit: string;
}

interface PatientCardProps {
  patient: Patient;
  onPress: () => void;
}

export default function PatientCard({ patient, onPress }: PatientCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{patient.name}</Text>
        <View style={styles.patientMeta}>
          <View style={styles.metaItem}>
            <User size={14} color={COLORS.textMedium} />
            <Text style={styles.metaText}>{patient.age} yrs, {patient.gender}</Text>
          </View>
          <View style={styles.metaItem}>
            <MapPin size={14} color={COLORS.textMedium} />
            <Text style={styles.metaText}>{patient.location}</Text>
          </View>
        </View>
        <View style={styles.metaItem}>
          <Phone size={14} color={COLORS.textMedium} />
          <Text style={styles.metaText}>{patient.phone}</Text>
        </View>
      </View>
      <Text style={styles.lastVisit}>
        Last visit: {patient.lastVisit}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
    textAlign: 'right',
  },
});