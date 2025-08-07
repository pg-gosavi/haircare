import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { Calendar, Clock, ArrowRight, User, Phone, MapPin, ChevronRight } from 'lucide-react-native';
import { mockTreatments } from '@/data/mockData';

export default function PatientDashboard() {
  const router = useRouter();
  
  // Mock patient data
  const patient = {
    id: 'p1',
    name: 'John Smith',
    age: 35,
    gender: 'Male',
    phone: '123-456-7890',
    email: 'john.smith@example.com',
    location: 'Nashik',
    registeredDate: '10 Jan 2024',
    nextAppointment: '28 Jun 2024',
    totalTreatments: 8,
    completedTreatments: 3,
  };

  const upcomingAppointments = [
    {
      id: 'a1',
      date: '28 Jun 2024',
      time: '10:30 AM',
      doctor: 'Dr. Patel',
      type: 'Regular Checkup',
    },
    {
      id: 'a2',
      date: '15 Jul 2024',
      time: '2:00 PM',
      doctor: 'Dr. Sharma',
      type: 'Treatment Session',
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {patient.name}</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <Text style={styles.avatarText}>{patient.name.charAt(0)}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentHeader}>
            <Text style={styles.appointmentTitle}>Next Appointment</Text>
            <Calendar size={20} color={COLORS.primary} />
          </View>
          
          {upcomingAppointments.length > 0 ? (
            <View style={styles.nextAppointment}>
              <View style={styles.appointmentDate}>
                <Text style={styles.appointmentDay}>
                  {upcomingAppointments[0].date.split(' ')[0]}
                </Text>
                <Text style={styles.appointmentMonth}>
                  {upcomingAppointments[0].date.split(' ')[1]}
                </Text>
              </View>
              
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentType}>{upcomingAppointments[0].type}</Text>
                <View style={styles.appointmentMeta}>
                  <Clock size={14} color={COLORS.textMedium} />
                  <Text style={styles.appointmentTime}>{upcomingAppointments[0].time}</Text>
                </View>
                <Text style={styles.appointmentDoctor}>{upcomingAppointments[0].doctor}</Text>
              </View>
              
              <TouchableOpacity style={styles.appointmentAction}>
                <ArrowRight size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.noAppointments}>No upcoming appointments</Text>
          )}
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Appointments</Text>
            <ChevronRight size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.treatmentProgressCard}>
          <Text style={styles.cardTitle}>Treatment Progress</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(patient.completedTreatments / patient.totalTreatments) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {patient.completedTreatments}/{patient.totalTreatments} Sessions Completed
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.progressButton}
            onPress={() => router.push('/timeline')}
          >
            <Text style={styles.progressButtonText}>View Treatment Timeline</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Recently Added Photos</Text>
        
        <View style={styles.recentPhotos}>
          {mockTreatments.length > 0 ? 
            mockTreatments[0].images.map((image, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.photoThumbnail}
                onPress={() => router.push('/timeline')}
              >
                <Image
                  source={{ uri: image.url }}
                  style={styles.thumbnailImage}
                />
                <View style={styles.thumbnailOverlay}>
                  <Text style={styles.thumbnailLabel}>{image.label}</Text>
                </View>
              </TouchableOpacity>
            )) : 
            <Text style={styles.noPhotos}>No recent photos</Text>
          }
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Your Profile</Text>
          
          <View style={styles.profileInfo}>
            <View style={styles.profileItem}>
              <User size={16} color={COLORS.primary} />
              <Text style={styles.profileText}>{patient.age} years, {patient.gender}</Text>
            </View>
            <View style={styles.profileItem}>
              <Phone size={16} color={COLORS.primary} />
              <Text style={styles.profileText}>{patient.phone}</Text>
            </View>
            <View style={styles.profileItem}>
              <MapPin size={16} color={COLORS.primary} />
              <Text style={styles.profileText}>{patient.location}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: COLORS.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  appointmentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  appointmentTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: COLORS.textDark,
  },
  nextAppointment: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 16,
  },
  appointmentDate: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  appointmentDay: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.primary,
  },
  appointmentMonth: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: COLORS.primary,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  appointmentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  appointmentTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
    marginLeft: 6,
  },
  appointmentDoctor: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
  },
  appointmentAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAppointments: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
    textAlign: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
    marginRight: 4,
  },
  treatmentProgressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressTrack: {
    height: 8,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textMedium,
    textAlign: 'right',
  },
  progressButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  progressButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: COLORS.white,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: 16,
  },
  recentPhotos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  photoThumbnail: {
    width: '48%',
    aspectRatio: 3/4,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
  },
  thumbnailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: COLORS.white,
  },
  noPhotos: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
    textAlign: 'center',
    padding: 24,
    width: '100%',
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 40,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileInfo: {
    marginBottom: 16,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textDark,
    marginLeft: 12,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  editProfileButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: COLORS.primary,
  },
});