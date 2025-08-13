import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const { width } = Dimensions.get('window');

// Mock course data
const mockCourse = {
  id: 1,
  title: 'Complete React Native Masterclass',
  instructor: 'John Doe',
  instructorAvatar: '👨‍💻',
  rating: 4.8,
  students: 15420,
  duration: '12 hours',
  level: 'Intermediate',
  category: 'Mobile Development',
  description: 'Learn React Native from scratch and build real-world mobile applications. This comprehensive course covers everything from basic concepts to advanced topics like state management, navigation, and API integration.',
  price: 89.99,
  originalPrice: 129.99,
  lessons: [
    {
      id: 1,
      title: 'Introduction to React Native',
      duration: '15:30',
      type: 'video',
      isCompleted: false,
      isLocked: false,
    },
    {
      id: 2,
      title: 'Setting Up Development Environment',
      duration: '22:15',
      type: 'video',
      isCompleted: false,
      isLocked: false,
    },
    {
      id: 3,
      title: 'Understanding Components and Props',
      duration: '18:45',
      type: 'video',
      isCompleted: false,
      isLocked: false,
    },
    {
      id: 4,
      title: 'State Management Basics',
      duration: '25:20',
      type: 'video',
      isCompleted: false,
      isLocked: true,
    },
    {
      id: 5,
      title: 'Navigation and Routing',
      duration: '31:10',
      type: 'video',
      isCompleted: false,
      isLocked: true,
    },
  ],
  requirements: [
    'Basic JavaScript knowledge',
    'Understanding of React concepts',
    'Node.js installed on your computer',
  ],
  whatYouWillLearn: [
    'Build cross-platform mobile apps',
    'Understand React Native architecture',
    'Implement state management',
    'Handle API integration',
    'Deploy to app stores',
  ],
};

interface CourseDetailsScreenProps {
  onEnroll: (courseId: number) => void;
  onLessonPress: (lessonId: number) => void;
  onBack: () => void;
}

export default function CourseDetailsScreen({ 
  onEnroll, 
  onLessonPress, 
  onBack 
}: CourseDetailsScreenProps) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');

  const handleEnroll = () => {
    setIsEnrolled(true);
    onEnroll(mockCourse.id);
  };

  const handleLessonPress = (lessonId: number) => {
    onLessonPress(lessonId);
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>What you'll learn</Text>
      {mockCourse.whatYouWillLearn.map((item, index) => (
        <View key={index} style={styles.learningItem}>
          <Text style={styles.learningBullet}>✓</Text>
          <Text style={styles.learningText}>{item}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Requirements</Text>
      {mockCourse.requirements.map((item, index) => (
        <View key={index} style={styles.requirementItem}>
          <Text style={styles.requirementBullet}>•</Text>
          <Text style={styles.requirementText}>{item}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.descriptionText}>{mockCourse.description}</Text>
    </View>
  );

  const renderCurriculum = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Course Content</Text>
      {mockCourse.lessons.map((lesson) => (
        <TouchableOpacity
          key={lesson.id}
          style={[
            styles.lessonItem,
            lesson.isLocked && styles.lockedLesson
          ]}
          onPress={() => !lesson.isLocked && handleLessonPress(lesson.id)}
          disabled={lesson.isLocked}
        >
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonDuration}>{lesson.duration}</Text>
          </View>
          <View style={styles.lessonStatus}>
            {lesson.isCompleted ? (
              <Text style={styles.completedIcon}>✅</Text>
            ) : lesson.isLocked ? (
              <Text style={styles.lockedIcon}>🔒</Text>
            ) : (
              <Text style={styles.playIcon}>▶️</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderReviews = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Student Reviews</Text>
      <View style={styles.reviewStats}>
        <Text style={styles.ratingText}>{mockCourse.rating}</Text>
        <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
        <Text style={styles.studentsText}>{mockCourse.students.toLocaleString()} students enrolled</Text>
      </View>
      <Text style={styles.comingSoonText}>Detailed reviews coming soon...</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Course Hero Section */}
        <Card style={styles.heroCard}>
          <Text style={styles.courseTitle}>{mockCourse.title}</Text>
          <Text style={styles.courseSubtitle}>by {mockCourse.instructor}</Text>
          
          <View style={styles.courseMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⭐</Text>
              <Text style={styles.metaText}>{mockCourse.rating}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>👥</Text>
              <Text style={styles.metaText}>{mockCourse.students.toLocaleString()}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⏱️</Text>
              <Text style={styles.metaText}>{mockCourse.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📊</Text>
              <Text style={styles.metaText}>{mockCourse.level}</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>${mockCourse.price}</Text>
            <Text style={styles.originalPrice}>${mockCourse.originalPrice}</Text>
            <Text style={styles.discount}>33% OFF</Text>
          </View>
        </Card>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
            onPress={() => setSelectedTab('overview')}
          >
            <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'curriculum' && styles.activeTab]}
            onPress={() => setSelectedTab('curriculum')}
          >
            <Text style={[styles.tabText, selectedTab === 'curriculum' && styles.activeTabText]}>
              Curriculum
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'reviews' && styles.activeTab]}
            onPress={() => setSelectedTab('reviews')}
          >
            <Text style={[styles.tabText, selectedTab === 'reviews' && styles.activeTabText]}>
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'curriculum' && renderCurriculum()}
        {selectedTab === 'reviews' && renderReviews()}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Enrollment Button */}
      <View style={styles.enrollmentContainer}>
        {!isEnrolled ? (
          <Button
            title="Enroll Now - $89.99"
            onPress={handleEnroll}
            fullWidth
            style={styles.enrollButton}
          />
        ) : (
          <Button
            title="Continue Learning"
            onPress={() => onLessonPress(1)}
            fullWidth
            style={styles.continueButton}
          />
        )}
      </View>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  heroCard: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
    lineHeight: 32,
  },
  courseSubtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 20,
  },
  courseMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 8,
  },
  metaIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  discount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  activeTabText: {
    color: '#1E293B',
  },
  tabContent: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    marginTop: 8,
  },
  learningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  learningBullet: {
    fontSize: 16,
    color: '#10B981',
    marginRight: 12,
    marginTop: 2,
  },
  learningText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
    lineHeight: 20,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  requirementBullet: {
    fontSize: 16,
    color: '#F59E0B',
    marginRight: 12,
    marginTop: 2,
  },
  requirementText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
    lineHeight: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 8,
  },
  lockedLesson: {
    opacity: 0.6,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  lessonStatus: {
    width: 40,
    alignItems: 'center',
  },
  completedIcon: {
    fontSize: 20,
  },
  lockedIcon: {
    fontSize: 20,
  },
  playIcon: {
    fontSize: 20,
  },
  reviewStats: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 8,
  },
  ratingStars: {
    fontSize: 24,
    marginBottom: 8,
  },
  studentsText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  comingSoonText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomSpacing: {
    height: 100,
  },
  enrollmentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  enrollButton: {
    backgroundColor: '#10B981',
  },
  continueButton: {
    backgroundColor: '#6366F1',
  },
}); 