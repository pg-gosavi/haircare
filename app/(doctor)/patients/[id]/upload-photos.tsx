import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { ArrowLeft, Camera, Upload, X } from 'lucide-react-native';
import { mockPatients } from '@/data/mockData';

export default function UploadPhotosScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Find patient in mock data
  const patient = mockPatients.find(p => p.id === id);
  
  const [notes, setNotes] = useState('');
  const [photoViewAngles, setPhotoViewAngles] = useState({
    front: null,
    left: null,
    right: null,
    back: null
  });

  // In a real app, this would use expo-image-picker
  const mockPhotoSelection = (angle) => {
    const mockPhotos = {
      front: 'https://images.pexels.com/photos/4047878/pexels-photo-4047878.jpeg?auto=compress&cs=tinysrgb&w=600',
      left: 'https://images.pexels.com/photos/3993331/pexels-photo-3993331.jpeg?auto=compress&cs=tinysrgb&w=600',
      right: 'https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=600',
      back: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=600'
    };
    
    setPhotoViewAngles(prev => ({
      ...prev,
      [angle]: mockPhotos[angle]
    }));
  };

  const removePhoto = (angle) => {
    setPhotoViewAngles(prev => ({
      ...prev,
      [angle]: null
    }));
  };

  const handleSave = () => {
    // In a real app, this would upload photos to server/storage
    // Navigate back to patient profile
    router.push({
      pathname: '/(doctor)/patients/[id]',
      params: { id }
    });
  };

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
        <Text style={styles.headerTitle}>Add Treatment Photos</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.patientInfoCard}>
          <Text style={styles.patientName}>{patient.name}</Text>
          <Text style={styles.patientDetails}>
            {patient.age} years, {patient.gender} • {patient.location}
          </Text>
        </View>

        <View style={styles.photoInstructions}>
          <Text style={styles.instructionsTitle}>Photo Guidelines</Text>
          <Text style={styles.instructionsText}>
            Take photos from front, left, right, and back angles in good lighting.
            Ensure consistent distance and positioning for accurate comparison.
          </Text>
        </View>

        <View style={styles.photosContainer}>
          <View style={styles.photoRow}>
            <View style={styles.photoBox}>
              <Text style={styles.photoLabel}>Front View</Text>
              {photoViewAngles.front ? (
                <View style={styles.photoPreviewContainer}>
                  <Image 
                    source={{ uri: photoViewAngles.front }} 
                    style={styles.photoPreview} 
                  />
                  <TouchableOpacity 
                    style={styles.removePhotoButton}
                    onPress={() => removePhoto('front')}
                  >
                    <X size={16} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.photoPlaceholder}
                  onPress={() => mockPhotoSelection('front')}
                >
                  <Camera size={32} color={COLORS.primary} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.photoBox}>
              <Text style={styles.photoLabel}>Left View</Text>
              {photoViewAngles.left ? (
                <View style={styles.photoPreviewContainer}>
                  <Image 
                    source={{ uri: photoViewAngles.left }} 
                    style={styles.photoPreview} 
                  />
                  <TouchableOpacity 
                    style={styles.removePhotoButton}
                    onPress={() => removePhoto('left')}
                  >
                    <X size={16} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.photoPlaceholder}
                  onPress={() => mockPhotoSelection('left')}
                >
                  <Camera size={32} color={COLORS.primary} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.photoRow}>
            <View style={styles.photoBox}>
              <Text style={styles.photoLabel}>Right View</Text>
              {photoViewAngles.right ? (
                <View style={styles.photoPreviewContainer}>
                  <Image 
                    source={{ uri: photoViewAngles.right }} 
                    style={styles.photoPreview} 
                  />
                  <TouchableOpacity 
                    style={styles.removePhotoButton}
                    onPress={() => removePhoto('right')}
                  >
                    <X size={16} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.photoPlaceholder}
                  onPress={() => mockPhotoSelection('right')}
                >
                  <Camera size={32} color={COLORS.primary} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.photoBox}>
              <Text style={styles.photoLabel}>Back View</Text>
              {photoViewAngles.back ? (
                <View style={styles.photoPreviewContainer}>
                  <Image 
                    source={{ uri: photoViewAngles.back }} 
                    style={styles.photoPreview} 
                  />
                  <TouchableOpacity 
                    style={styles.removePhotoButton}
                    onPress={() => removePhoto('back')}
                  >
                    <X size={16} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.photoPlaceholder}
                  onPress={() => mockPhotoSelection('back')}
                >
                  <Camera size={32} color={COLORS.primary} />
                  <Text style={styles.photoPlaceholderText}>Add Photo</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Treatment Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add notes about this treatment session"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity 
          style={[
            styles.saveButton, 
            (!photoViewAngles.front && !photoViewAngles.left && 
             !photoViewAngles.right && !photoViewAngles.back) ? 
              styles.saveButtonDisabled : null
          ]} 
          onPress={handleSave}
          disabled={!photoViewAngles.front && !photoViewAngles.left && 
                   !photoViewAngles.right && !photoViewAngles.back}
        >
          <Upload size={20} color={COLORS.white} />
          <Text style={styles.saveButtonText}>Save Photos</Text>
        </TouchableOpacity>
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
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: -16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  patientInfoCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  patientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  patientDetails: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
  },
  photoInstructions: {
    marginBottom: 24,
  },
  instructionsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 8,
  },
  instructionsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
    lineHeight: 20,
  },
  photosContainer: {
    marginBottom: 24,
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  photoBox: {
    width: '48%',
  },
  photoLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textMedium,
    marginBottom: 8,
  },
  photoPlaceholder: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    aspectRatio: 3/4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  photoPlaceholderText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 8,
  },
  photoPreviewContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    aspectRatio: 3/4,
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 6,
  },
  notesContainer: {
    marginBottom: 24,
  },
  notesLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textMedium,
    marginBottom: 8,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textDark,
    minHeight: 100,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.white,
    marginLeft: 8,
  },
});