import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { ArrowLeft, User, MapPin, Phone, Mail, Calendar, Download, CreditCard as Edit } from 'lucide-react-native';
import { mockPatients, mockTreatments } from '@/data/mockData';
import TabView from '@/components/ui/TabView';

export default function PatientProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('timeline');
  
  // Find patient in mock data
  const patient = mockPatients.find(p => p.id === id);
  const treatments = mockTreatments.filter(t => t.patientId === id);
  
  if (!patient) {
    return (
      <View style={styles.container}>
        <Text>Patient not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Edit size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{patient.name.charAt(0)}</Text>
            </View>
            <View style={styles.patientInfoContainer}>
              <Text style={styles.patientName}>{patient.name}</Text>
              <View style={styles.metaItem}>
                <User size={14} color={COLORS.textMedium} />
                <Text style={styles.metaText}>{patient.age} yrs, {patient.gender}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Phone size={16} color={COLORS.primary} />
              <Text style={styles.contactText}>{patient.phone}</Text>
            </View>
            {patient.email && (
              <View style={styles.contactItem}>
                <Mail size={16} color={COLORS.primary} />
                <Text style={styles.contactText}>{patient.email}</Text>
              </View>
            )}
            <View style={styles.contactItem}>
              <MapPin size={16} color={COLORS.primary} />
              <Text style={styles.contactText}>{patient.location}</Text>
            </View>
            <View style={styles.contactItem}>
              <Calendar size={16} color={COLORS.primary} />
              <Text style={styles.contactText}>Registered on {patient.registeredDate}</Text>
            </View>
          </View>
        </View>

        <TabView
          tabs={[
            { key: 'timeline', title: 'Timeline' },
            { key: 'photos', title: 'Photos' },
            { key: 'notes', title: 'Notes' },
            { key: 'payments', title: 'Payments' },
          ]}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />

        {activeTab === 'timeline' && (
          <View style={styles.tabContent}>
            {treatments.length > 0 ? (
              treatments.map((treatment, index) => (
                <View key={treatment.id} style={styles.treatmentCard}>
                  <View style={styles.treatmentHeader}>
                    <Text style={styles.treatmentDate}>{treatment.date}</Text>
                    <TouchableOpacity style={styles.exportButton}>
                      <Download size={16} color={COLORS.primary} />
                      <Text style={styles.exportText}>Export</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.sessionText}>Session {index + 1}</Text>
                  <Text style={styles.treatmentNotes}>{treatment.notes}</Text>
                  
                  {treatment.images.length > 0 && (
                    <View style={styles.treatmentImages}>
                      {treatment.images.map((image, imgIndex) => (
                        <View key={imgIndex} style={styles.treatmentImageContainer}>
                          <Image
                            source={{ uri: image.url }}
                            style={styles.treatmentImage}
                          />
                          <Text style={styles.imageLabel}>{image.label}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No treatment history yet</Text>
              </View>
            )}
          </View>
        )}

        {activeTab === 'photos' && (
          <View style={styles.tabContent}>
            <TouchableOpacity 
              style={styles.addPhotosButton}
              onPress={() => router.push({
                pathname: '/(doctor)/patients/[id]/upload-photos',
                params: { id }
              })}
            >
              <Text style={styles.addPhotosButtonText}>Add New Photos</Text>
            </TouchableOpacity>
            
            <Text style={styles.sectionTitle}>Recent Photos</Text>
            <View style={styles.photosGrid}>
              {treatments.flatMap(t => t.images).slice(0, 6).map((image, index) => (
                <TouchableOpacity key={index} style={styles.photoThumbnail}>
                  <Image
                    source={{ uri: image.url }}
                    style={styles.thumbnailImage}
                  />
                  <View style={styles.thumbnailOverlay}>
                    <Text style={styles.thumbnailLabel}>{image.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'notes' && (
          <View style={styles.tabContent}>
            <View style={styles.notesCard}>
              <Text style={styles.notesTitle}>Treatment Notes</Text>
              <Text style={styles.notesText}>{patient.notes || 'No notes available'}</Text>
            </View>
          </View>
        )}

        {activeTab === 'payments' && (
          <View style={styles.tabContent}>
            <View style={styles.paymentsCard}>
              <Text style={styles.paymentsTitle}>Payment History</Text>
              <View style={styles.paymentsTable}>
                <View style={styles.paymentsTableRow}>
                  <Text style={styles.paymentsHeaderCell}>Date</Text>
                  <Text style={styles.paymentsHeaderCell}>Amount</Text>
                  <Text style={styles.paymentsHeaderCell}>Status</Text>
                </View>
                <View style={styles.paymentsTableRow}>
                  <Text style={styles.paymentsCell}>12 Jun 2024</Text>
                  <Text style={styles.paymentsCell}>₹5,000</Text>
                  <Text style={[styles.paymentsCell, styles.paidStatus]}>Paid</Text>
                </View>
                <View style={styles.paymentsTableRow}>
                  <Text style={styles.paymentsCell}>25 May 2024</Text>
                  <Text style={styles.paymentsCell}>₹8,000</Text>
                  <Text style={[styles.paymentsCell, styles.paidStatus]}>Paid</Text>
                </View>
                <View style={styles.paymentsTableRow}>
                  <Text style={styles.paymentsCell}>10 Apr 2024</Text>
                  <Text style={styles.paymentsCell}>₹12,000</Text>
                  <Text style={[styles.paymentsCell, styles.pendingStatus]}>Pending</Text>
                </View>
              </View>
            </View>
          </View>
        )}
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
    flex: 1,
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
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
  patientInfoContainer: {
    flex: 1,
  },
  patientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
    marginLeft: 4,
  },
  contactInfo: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textDark,
    marginLeft: 12,
  },
  tabContent: {
    padding: 16,
    paddingBottom: 80,
  },
  treatmentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  treatmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  treatmentDate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.textDark,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exportText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 4,
  },
  sessionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 8,
  },
  treatmentNotes: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 16,
  },
  treatmentImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  treatmentImageContainer: {
    width: '48%',
    marginBottom: 12,
  },
  treatmentImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: COLORS.background,
  },
  imageLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textMedium,
    marginTop: 4,
    textAlign: 'center',
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
  },
  addPhotosButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  addPhotosButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.white,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: 16,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoThumbnail: {
    width: '31%',
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 8,
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
    padding: 4,
  },
  thumbnailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: COLORS.white,
    textAlign: 'center',
  },
  notesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  notesTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 12,
  },
  notesText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 22,
  },
  paymentsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  paymentsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 16,
  },
  paymentsTable: {
    width: '100%',
  },
  paymentsTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 12,
  },
  paymentsHeaderCell: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: COLORS.textDark,
  },
  paymentsCell: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textDark,
  },
  paidStatus: {
    color: COLORS.success,
  },
  pendingStatus: {
    color: COLORS.warning,
  },
});