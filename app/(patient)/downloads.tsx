import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { Download, FileText, Calendar, Check } from 'lucide-react-native';
import { mockTreatments } from '@/data/mockData';

export default function DownloadsScreen() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  
  // For a real app, these would be fetched from backend
  const reports = mockTreatments.map(treatment => ({
    id: treatment.id,
    date: treatment.date,
    title: `Treatment Report - ${treatment.date}`,
    size: '2.4 MB',
    thumbnailUrl: treatment.images[0]?.url || null,
  }));

  const handleDownload = (id: string) => {
    // In a real app, this would initiate a file download
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Downloads</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Download Reports & Photos</Text>
          <Text style={styles.infoCardText}>
            Access and download your treatment reports and photos from each session.
          </Text>
        </View>

        <View style={styles.downloadOptions}>
          <TouchableOpacity style={styles.downloadOption}>
            <FileText size={20} color={COLORS.primary} />
            <Text style={styles.downloadOptionText}>Full Patient Report</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.downloadOption}>
            <Calendar size={20} color={COLORS.primary} />
            <Text style={styles.downloadOptionText}>Latest Session</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Session Reports</Text>

        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reportItem}>
              <View style={styles.reportItemLeft}>
                {item.thumbnailUrl ? (
                  <Image 
                    source={{ uri: item.thumbnailUrl }} 
                    style={styles.reportThumbnail} 
                  />
                ) : (
                  <View style={styles.reportThumbnailPlaceholder}>
                    <FileText size={24} color={COLORS.primary} />
                  </View>
                )}
                
                <View style={styles.reportInfo}>
                  <Text style={styles.reportTitle}>{item.title}</Text>
                  <Text style={styles.reportMeta}>{item.size}</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.downloadButton,
                  downloadingId === item.id && styles.downloadingButton
                ]}
                onPress={() => handleDownload(item.id)}
                disabled={downloadingId === item.id}
              >
                {downloadingId === item.id ? (
                  <Check size={20} color={COLORS.white} />
                ) : (
                  <Download size={20} color={COLORS.white} />
                )}
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.reportsList}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <FileText size={40} color={COLORS.textLight} />
              <Text style={styles.emptyStateText}>No reports available</Text>
            </View>
          }
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
  infoCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  infoCardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: 8,
  },
  infoCardText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
    lineHeight: 20,
  },
  downloadOptions: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  downloadOption: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  downloadOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textDark,
    marginTop: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: 16,
  },
  reportsList: {
    paddingBottom: 24,
  },
  reportItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  reportItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reportThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  reportThumbnailPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  reportMeta: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textMedium,
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadingButton: {
    backgroundColor: COLORS.success,
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