import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const { width, height } = Dimensions.get('window');

// Mock lesson data
const mockLesson = {
  id: 1,
  title: 'Introduction to React Native',
  description: 'Learn the fundamentals of React Native, understand the architecture, and set up your first project. This lesson covers the basics you need to know before diving into development.',
  duration: '15:30',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Sample video URL
  courseTitle: 'Complete React Native Masterclass',
  instructor: 'John Doe',
  isCompleted: false,
  notes: [
    'React Native allows you to build mobile apps using JavaScript',
    'It uses the same design as React, letting you compose a rich mobile UI',
    'You can develop for both iOS and Android from a single codebase',
  ],
  resources: [
    {
      name: 'React Native Documentation',
      type: '📚',
      url: 'https://reactnative.dev/docs/getting-started',
    },
    {
      name: 'Sample Code Repository',
      type: '💻',
      url: 'https://github.com/example/react-native-samples',
    },
    {
      name: 'Cheat Sheet',
      type: '📋',
      url: 'https://example.com/cheat-sheet',
    },
  ],
};

interface VideoLessonScreenProps {
  onBack: () => void;
  onNextLesson: () => void;
  onPreviousLesson: () => void;
  onMarkComplete: (lessonId: number) => void;
}

export default function VideoLessonScreen({
  onBack,
  onNextLesson,
  onPreviousLesson,
  onMarkComplete,
}: VideoLessonScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isCompleted, setIsCompleted] = useState(mockLesson.isCompleted);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<Video>(null);

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = async (newTime: number) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(newTime);
      setCurrentTime(newTime);
    }
  };

  const handleVideoStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000);
      setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);
      setIsPlaying(status.isPlaying);
      setIsLoading(false);
    } else if (status.error) {
      setError(`Video error: ${status.error}`);
      setIsLoading(false);
    }
  };

  const handleMarkComplete = () => {
    setIsCompleted(true);
    onMarkComplete(mockLesson.id);
    Alert.alert(
      'Lesson Completed! 🎉',
      'Great job! You\'ve completed this lesson.',
      [
        {
          text: 'Continue to Next',
          onPress: onNextLesson,
        },
        {
          text: 'Stay Here',
          style: 'cancel',
        },
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressBarPress = (event: any) => {
    const { locationX } = event.nativeEvent;
    const progressBarWidth = width - 40 - 32 - 80; // container margin - padding - play button width
    const newTime = (locationX / progressBarWidth) * duration;
    handleSeek(Math.max(0, Math.min(newTime, duration)));
  };

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B']}
      style={styles.container}
    >
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.courseTitle} numberOfLines={1}>
            {mockLesson.courseTitle}
          </Text>
          <Text style={styles.lessonTitle} numberOfLines={1}>
            {mockLesson.title}
          </Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Video Player */}
        <View style={styles.videoContainer}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>❌ {error}</Text>
              <Text style={styles.errorSubtext}>Please check your internet connection</Text>
            </View>
          ) : (
            <>
              <Video
                ref={videoRef}
                source={{ uri: mockLesson.videoUrl }}
                style={styles.video}
                useNativeControls={false}
                resizeMode={ResizeMode.CONTAIN}
                onPlaybackStatusUpdate={handleVideoStatusUpdate}
                onLoadStart={() => setIsLoading(true)}
                onLoad={() => setIsLoading(false)}
                onError={() => setError('Video failed to load. Please check your internet connection.')}
              />
              
              {isLoading && (
                <View style={styles.loadingOverlay}>
                  <Text style={styles.loadingText}>Loading video...</Text>
                </View>
              )}
            </>
          )}
          
          {/* Video Controls */}
          <View style={styles.videoControls}>
            <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
              <Text style={styles.playButtonText}>
                {isPlaying ? '⏸️' : '▶️'}
              </Text>
            </TouchableOpacity>
            
            <View style={styles.progressContainer}>
              <TouchableOpacity 
                style={styles.progressBar} 
                onPress={handleProgressBarPress}
                activeOpacity={0.8}
              >
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </TouchableOpacity>
              <View style={styles.timeInfo}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Lesson Information */}
        <Card style={styles.lessonInfoCard}>
          <View style={styles.lessonHeader}>
            <View style={styles.lessonMeta}>
              <Text style={styles.durationText}>⏱️ {mockLesson.duration}</Text>
              <Text style={styles.instructorText}>👨‍💻 {mockLesson.instructor}</Text>
            </View>
            {isCompleted && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>✅ Completed</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.descriptionText}>{mockLesson.description}</Text>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title={isCompleted ? "✓ Lesson Completed" : "Mark as Complete"}
            onPress={handleMarkComplete}
            variant="primary"
            disabled={isCompleted}
            style={styles.completeButton}
          />
          
          <View style={styles.navigationButtons}>
            <Button
              title="← Previous"
              onPress={onPreviousLesson}
              variant="outline"
              style={styles.navButton}
            />
            <Button
              title="Next →"
              onPress={onNextLesson}
              variant="primary"
              style={styles.navButton}
            />
          </View>
        </View>

        {/* Notes Section */}
        <Card style={styles.notesCard}>
          <TouchableOpacity
            style={styles.notesHeader}
            onPress={() => setShowNotes(!showNotes)}
          >
            <Text style={styles.notesTitle}>📝 Lesson Notes</Text>
            <Text style={styles.notesToggle}>{showNotes ? '▼' : '▶'}</Text>
          </TouchableOpacity>
          
          {showNotes && (
            <View style={styles.notesContent}>
              {mockLesson.notes.map((note, index) => (
                <View key={index} style={styles.noteItem}>
                  <Text style={styles.noteBullet}>•</Text>
                  <Text style={styles.noteText}>{note}</Text>
                </View>
              ))}
            </View>
          )}
        </Card>

        {/* Resources Section */}
        <Card style={styles.resourcesCard}>
          <Text style={styles.resourcesTitle}>📚 Additional Resources</Text>
          {mockLesson.resources.map((resource, index) => (
            <TouchableOpacity key={index} style={styles.resourceItem}>
              <Text style={styles.resourceIcon}>{resource.type}</Text>
              <Text style={styles.resourceName}>{resource.name}</Text>
              <Text style={styles.resourceArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
    marginHorizontal: 16,
  },
  courseTitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 2,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  videoContainer: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9, // Default aspect ratio for video
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorSubtext: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  videoControls: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E293B',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  playButtonText: {
    fontSize: 20,
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  lessonInfoCard: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    backgroundColor: 'white',
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  lessonMeta: {
    flex: 1,
  },
  durationText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  instructorText: {
    fontSize: 14,
    color: '#64748B',
  },
  completedBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  descriptionText: {
    fontSize: 16,
    color: '#1E293B',
    lineHeight: 24,
  },
  actionButtons: {
    margin: 20,
    marginTop: 0,
  },
  completeButton: {
    marginBottom: 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  notesCard: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    backgroundColor: 'white',
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  notesToggle: {
    fontSize: 16,
    color: '#6366F1',
    fontWeight: 'bold',
  },
  notesContent: {
    marginTop: 16,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  noteBullet: {
    fontSize: 16,
    color: '#6366F1',
    marginRight: 12,
    marginTop: 2,
  },
  noteText: {
    fontSize: 14,
    color: '#64748B',
    flex: 1,
    lineHeight: 20,
  },
  resourcesCard: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    backgroundColor: 'white',
  },
  resourcesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  resourceIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  resourceName: {
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
  },
  resourceArrow: {
    fontSize: 16,
    color: '#6366F1',
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 100,
  },
}); 