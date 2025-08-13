import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../components/Card';

const { width } = Dimensions.get('window');

// Mock data for demonstration
const mockCourses = [
  {
    id: 1,
    title: 'React Native Fundamentals',
    instructor: 'John Doe',
    progress: 75,
    thumbnail: '📱',
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    instructor: 'Jane Smith',
    progress: 45,
    thumbnail: '⚡',
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    instructor: 'Mike Johnson',
    progress: 90,
    thumbnail: '🎨',
  },
];

const mockRecommended = [
  {
    id: 4,
    title: 'Machine Learning Basics',
    instructor: 'Dr. Sarah Wilson',
    rating: 4.8,
    students: 1250,
    thumbnail: '🤖',
  },
  {
    id: 5,
    title: 'Web Development Bootcamp',
    instructor: 'Alex Chen',
    rating: 4.9,
    students: 2100,
    thumbnail: '💻',
  },
];

interface HomeScreenProps {
  onNavigateToCourse: (courseId: number) => void;
  onNavigateToCourseListing: () => void;
  onNavigateToProfile: () => void;
  onNavigateToAdmin: () => void;
}

export default function HomeScreen({ onNavigateToCourse, onNavigateToCourseListing, onNavigateToProfile, onNavigateToAdmin }: HomeScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    enrolledCourses: 3,
    averageProgress: 70,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleCoursePress = (courseId: number) => {
    onNavigateToCourse(courseId);
  };

  const handleNotificationsPress = () => {
    // TODO: Navigate to notifications
    console.log('Navigate to notifications');
  };

  const handleProfilePress = () => {
    onNavigateToProfile();
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>
              Welcome back, Learner! 👋
            </Text>
            <Text style={styles.subtitleText}>
              Ready to continue your learning journey?
            </Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleNotificationsPress}
            >
              <Text style={styles.iconText}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleProfilePress}
            >
              <Text style={styles.iconText}>👤</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onNavigateToAdmin}
            >
              <Text style={styles.iconText}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.enrolledCourses}</Text>
            <Text style={styles.statLabel}>Enrolled Courses</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.averageProgress}%</Text>
            <Text style={styles.statLabel}>Average Progress</Text>
          </Card>
        </View>

        {/* Browse Courses Button */}
        <View style={styles.browseSection}>
          <Card style={styles.browseCard}>
            <Text style={styles.browseTitle}>Discover New Courses</Text>
            <Text style={styles.browseSubtitle}>Explore our library of courses and find your next learning adventure</Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={onNavigateToCourseListing}
              activeOpacity={0.8}
            >
              <Text style={styles.browseButtonText}>Browse All Courses</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Continue Learning */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockCourses.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() => handleCoursePress(course.id)}
              >
                <Text style={styles.courseThumbnail}>{course.thumbnail}</Text>
                <Text style={styles.courseTitle} numberOfLines={2}>
                  {course.title}
                </Text>
                <Text style={styles.courseInstructor}>{course.instructor}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${course.progress}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>{course.progress}%</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommended for You */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          {mockRecommended.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.recommendedCard}
              onPress={() => handleCoursePress(course.id)}
            >
              <Text style={styles.recommendedThumbnail}>{course.thumbnail}</Text>
              <View style={styles.recommendedInfo}>
                <Text style={styles.recommendedTitle} numberOfLines={2}>
                  {course.title}
                </Text>
                <Text style={styles.recommendedInstructor}>
                  {course.instructor}
                </Text>
                <View style={styles.recommendedMeta}>
                  <Text style={styles.rating}>⭐ {course.rating}</Text>
                  <Text style={styles.students}>
                    👥 {course.students.toLocaleString()} students
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Courses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Courses</Text>
          <TouchableOpacity
            style={styles.popularCard}
            onPress={() => handleCoursePress(6)}
          >
            <Text style={styles.popularThumbnail}>🚀</Text>
            <View style={styles.popularInfo}>
              <Text style={styles.popularTitle}>Complete Python Masterclass</Text>
              <Text style={styles.popularInstructor}>by Python Expert</Text>
              <Text style={styles.popularStudents}>5,000+ students enrolled</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  welcomeSection: {
    flex: 1,
    marginRight: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  courseCard: {
    width: 160,
    marginRight: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
  },
  courseThumbnail: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
    lineHeight: 18,
  },
  courseInstructor: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  recommendedCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    marginBottom: 12,
  },
  recommendedThumbnail: {
    fontSize: 32,
    marginRight: 16,
  },
  recommendedInfo: {
    flex: 1,
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
    lineHeight: 20,
  },
  recommendedInstructor: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  recommendedMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  rating: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  students: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  popularCard: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 2,
  },
  popularThumbnail: {
    fontSize: 40,
    marginRight: 20,
  },
  popularInfo: {
    flex: 1,
  },
  popularTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  popularInstructor: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  popularStudents: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  browseSection: {
    marginBottom: 24,
  },
  browseCard: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    alignItems: 'center',
  },
  browseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  browseSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  browseButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 0,
  },
  browseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 