import { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Download } from 'lucide-react-native';
import { mockTreatments } from '@/data/mockData';

const { width } = Dimensions.get('window');

export default function TimelineScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  
  // For a real app, this would be fetched from backend
  const sortedTreatments = [...mockTreatments].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Descending order (newest first)
  });

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const toggleSession = (id: string) => {
    if (expandedSession === id) {
      setExpandedSession(null);
    } else {
      setExpandedSession(id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Treatment Timeline</Text>
      </View>

      <ScrollView ref={scrollRef} style={styles.content}>
        <View style={styles.timelineHeader}>
          <Text style={styles.timelineTitle}>Hair Growth Progress</Text>
          <Text style={styles.timelineSubtitle}>
            Track your hair treatment progress over time
          </Text>
        </View>

        <View style={styles.beforeAfterContainer}>
          <View style={styles.beforeAfterHeader}>
            <Text style={styles.beforeAfterTitle}>Before & After</Text>
            <Text style={styles.beforeAfterSubtitle}>
              {sortedTreatments.length > 0 ? 
                `${sortedTreatments[sortedTreatments.length - 1].date} - ${sortedTreatments[0].date}` : 
                "No data available"}
            </Text>
          </View>

          {sortedTreatments.length >= 2 && (
            <View style={styles.beforeAfterImages}>
              <View style={styles.beforeAfterImageContainer}>
                <Image 
                  source={{ uri: sortedTreatments[sortedTreatments.length - 1].images[0].url }} 
                  style={styles.beforeAfterImage} 
                />
                <View style={styles.imageLabelBox}>
                  <Text style={styles.imageLabelText}>Before</Text>
                </View>
              </View>
              
              <View style={styles.arrowContainer}>
                <ArrowRight size={24} color={COLORS.primary} />
              </View>
              
              <View style={styles.beforeAfterImageContainer}>
                <Image 
                  source={{ uri: sortedTreatments[0].images[0].url }} 
                  style={styles.beforeAfterImage} 
                />
                <View style={[styles.imageLabelBox, styles.afterLabel]}>
                  <Text style={styles.imageLabelText}>After</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={styles.sessionsContainer}>
          <Text style={styles.sessionsTitle}>All Sessions</Text>

          {sortedTreatments.map((treatment, index) => (
            <View key={treatment.id} style={styles.sessionCard}>
              <TouchableOpacity 
                style={styles.sessionHeader}
                onPress={() => toggleSession(treatment.id)}
              >
                <View style={styles.sessionHeaderLeft}>
                  <View style={styles.sessionNumberBadge}>
                    <Text style={styles.sessionNumberText}>
                      {sortedTreatments.length - index}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.sessionDate}>{treatment.date}</Text>
                    <Text style={styles.sessionType}>
                      {index === 0 ? 'Latest Session' : `Session ${sortedTreatments.length - index}`}
                    </Text>
                  </View>
                </View>
                {expandedSession === treatment.id ? 
                  <ChevronUp size={20} color={COLORS.textMedium} /> : 
                  <ChevronDown size={20} color={COLORS.textMedium} />
                }
              </TouchableOpacity>

              {expandedSession === treatment.id && (
                <View style={styles.sessionDetails}>
                  <Text style={styles.sessionNotesTitle}>Notes:</Text>
                  <Text style={styles.sessionNotes}>{treatment.notes}</Text>
                  
                  {treatment.images.length > 0 && (
                    <View style={styles.sessionImagesContainer}>
                      <Text style={styles.sessionImagesTitle}>Photos:</Text>
                      <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        style={styles.sessionImagesScroll}
                      >
                        {treatment.images.map((image, imgIndex) => (
                          <View key={imgIndex} style={styles.sessionImageItem}>
                            <Image 
                              source={{ uri: image.url }} 
                              style={styles.sessionImage} 
                            />
                            <Text style={styles.sessionImageLabel}>{image.label}</Text>
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                  
                  <TouchableOpacity style={styles.downloadButton}>
                    <Download size={16} color={COLORS.primary} />
                    <Text style={styles.downloadButtonText}>Download Report</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.scrollToTopButton}
        onPress={scrollToTop}
      >
        <ArrowUp size={20} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

// Import at the top of the file
import { ArrowUp } from 'lucide-react-native';

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
  timelineHeader: {
    marginBottom: 24,
  },
  timelineTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  timelineSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
  },
  beforeAfterContainer: {
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
  beforeAfterHeader: {
    marginBottom: 16,
  },
  beforeAfterTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  beforeAfterSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
  },
  beforeAfterImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  beforeAfterImageContainer: {
    width: (width - 80) / 2,
    position: 'relative',
  },
  beforeAfterImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  arrowContainer: {
    width: 32,
    alignItems: 'center',
  },
  imageLabelBox: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.error,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  afterLabel: {
    backgroundColor: COLORS.success,
  },
  imageLabelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: COLORS.white,
  },
  sessionsContainer: {
    marginBottom: 80,
  },
  sessionsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: 16,
  },
  sessionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
    overflow: 'hidden',
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  sessionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sessionNumberText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: COLORS.primary,
  },
  sessionDate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: COLORS.textDark,
  },
  sessionType: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textMedium,
  },
  sessionDetails: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  sessionNotesTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  sessionNotes: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 16,
  },
  sessionImagesContainer: {
    marginBottom: 16,
  },
  sessionImagesTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 8,
  },
  sessionImagesScroll: {
    marginHorizontal: -8,
  },
  sessionImageItem: {
    marginHorizontal: 8,
    width: 120,
  },
  sessionImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
  },
  sessionImageLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textMedium,
    marginTop: 4,
    textAlign: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  downloadButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 8,
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});