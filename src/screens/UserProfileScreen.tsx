import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const { width, height } = Dimensions.get('window');

// Mock user data
const mockUser = {
  id: 1,
  name: 'vivek panth',
  email: 'vivek.panth@gmail.com',
  avatar: '👤',
  joinDate: 'March 2024',
  totalCourses: 8,
  completedCourses: 3,
  totalHours: 45,
  currentStreak: 7,
  level: 'Intermediate',
  points: 1250,
  achievements: [
    {
      id: 1,
      title: 'First Course Completed',
      description: 'Completed your first course',
      icon: '🎯',
      unlockedAt: '2024-03-15',
      isUnlocked: true,
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: 'Maintained a 7-day learning streak',
      icon: '🔥',
      unlockedAt: '2024-03-20',
      isUnlocked: true,
    },
    {
      id: 3,
      title: 'Knowledge Seeker',
      description: 'Completed 5 courses',
      icon: '📚',
      unlockedAt: null,
      isUnlocked: false,
    },
    {
      id: 4,
      title: 'Speed Learner',
      description: 'Completed a course in under 2 weeks',
      icon: '⚡',
      unlockedAt: null,
      isUnlocked: false,
    },
  ],
  enrolledCourses: [
    {
      id: 1,
      title: 'Complete React Native Masterclass',
      instructor: 'John Doe',
      progress: 75,
      thumbnail: '📱',
      lastAccessed: '2 hours ago',
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      instructor: 'Sarah Johnson',
      progress: 45,
      thumbnail: '⚡',
      lastAccessed: '1 day ago',
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Rodriguez',
      progress: 90,
      thumbnail: '🎨',
      lastAccessed: '3 days ago',
    },
  ],
};

interface UserProfileScreenProps {
  onBack: () => void;
  onCoursePress: (courseId: number) => void;
  onLogout: () => void;
}

export default function UserProfileScreen({
  onBack,
  onCoursePress,
  onLogout,
}: UserProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'achievements' | 'settings'>('overview');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: onLogout,
        },
      ]
    );
  };

  const renderOverviewTab = () => (
    <View>
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{mockUser.totalCourses}</Text>
          <Text style={styles.statLabel}>Enrolled Courses</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{mockUser.completedCourses}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{mockUser.totalHours}h</Text>
          <Text style={styles.statLabel}>Total Hours</Text>
        </Card>
      </View>

      {/* Current Streak */}
      <Card style={styles.streakCard}>
        <View style={styles.streakHeader}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakTitle}>Current Streak</Text>
        </View>
        <Text style={styles.streakNumber}>{mockUser.currentStreak} days</Text>
        <Text style={styles.streakSubtitle}>Keep it up! You're doing great!</Text>
      </Card>

      {/* Level & Points */}
      <Card style={styles.levelCard}>
        <View style={styles.levelHeader}>
          <Text style={styles.levelIcon}>🏆</Text>
          <Text style={styles.levelTitle}>Level {mockUser.level}</Text>
        </View>
        <Text style={styles.pointsText}>{mockUser.points} points</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '65%' }]} />
        </View>
        <Text style={styles.progressText}>650 points to next level</Text>
      </Card>
    </View>
  );

  const renderCoursesTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Enrolled Courses ({mockUser.enrolledCourses.length})</Text>
      {mockUser.enrolledCourses.map((course) => (
        <TouchableOpacity
          key={course.id}
          style={styles.courseItem}
          onPress={() => onCoursePress(course.id)}
          activeOpacity={0.8}
        >
          <View style={styles.courseThumbnail}>
            <Text style={styles.courseThumbnailText}>{course.thumbnail}</Text>
          </View>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle} numberOfLines={2}>
              {course.title}
            </Text>
            <Text style={styles.courseInstructor}>by {course.instructor}</Text>
            <View style={styles.courseProgress}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{course.progress}%</Text>
            </View>
            <Text style={styles.lastAccessed}>Last accessed: {course.lastAccessed}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAchievementsTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Achievements ({mockUser.achievements.filter(a => a.isUnlocked).length}/{mockUser.achievements.length})</Text>
      {mockUser.achievements.map((achievement) => (
        <Card key={achievement.id} style={styles.achievementCard}>
          <View style={styles.achievementHeader}>
            <Text style={[
              styles.achievementIcon,
              !achievement.isUnlocked && styles.achievementIconLocked
            ]}>
              {achievement.isUnlocked ? achievement.icon : '🔒'}
            </Text>
            <View style={styles.achievementInfo}>
              <Text style={[
                styles.achievementTitle,
                !achievement.isUnlocked && styles.achievementTitleLocked
              ]}>
                {achievement.title}
              </Text>
              <Text style={[
                styles.achievementDescription,
                !achievement.isUnlocked && styles.achievementDescriptionLocked
              ]}>
                {achievement.description}
              </Text>
              {achievement.isUnlocked && (
                <Text style={styles.achievementDate}>
                  Unlocked: {achievement.unlockedAt}
                </Text>
              )}
            </View>
          </View>
        </Card>
      ))}
    </View>
  );

  const renderSettingsTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Preferences</Text>
      
      <Card style={styles.settingCard}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Push Notifications</Text>
            <Text style={styles.settingDescription}>Receive notifications about course updates</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#E2E8F0', true: '#6366F1' }}
            thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
      </Card>

      <Card style={styles.settingCard}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Email Notifications</Text>
            <Text style={styles.settingDescription}>Receive email updates and newsletters</Text>
          </View>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: '#E2E8F0', true: '#6366F1' }}
            thumbColor={emailNotifications ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
      </Card>

      <Card style={styles.settingCard}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Dark Mode</Text>
            <Text style={styles.settingDescription}>Use dark theme throughout the app</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#E2E8F0', true: '#6366F1' }}
            thumbColor={darkMode ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Account</Text>
      
      <Card style={styles.settingCard}>
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Edit Profile</Text>
            <Text style={styles.settingDescription}>Update your personal information</Text>
          </View>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
      </Card>

      <Card style={styles.settingCard}>
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Change Password</Text>
            <Text style={styles.settingDescription}>Update your account password</Text>
          </View>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
      </Card>

      <Card style={styles.settingCard}>
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Privacy Settings</Text>
            <Text style={styles.settingDescription}>Manage your privacy preferences</Text>
          </View>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
      </Card>

      <View style={styles.logoutContainer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Info Card */}
        <Card style={styles.userCard}>
          <View style={styles.userHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{mockUser.avatar}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{mockUser.name}</Text>
              <Text style={styles.userEmail}>{mockUser.email}</Text>
              <Text style={styles.userJoinDate}>Member since {mockUser.joinDate}</Text>
            </View>
          </View>
        </Card>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {[
            { key: 'overview', label: 'Overview', icon: '📊' },
            { key: 'courses', label: 'Courses', icon: '📚' },
            { key: 'achievements', label: 'Achievements', icon: '🏆' },
            { key: 'settings', label: 'Settings', icon: '⚙️' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabButton,
                activeTab === tab.key && styles.tabButtonActive
              ]}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[
                styles.tabLabel,
                activeTab === tab.key && styles.tabLabelActive
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'courses' && renderCoursesTab()}
          {activeTab === 'achievements' && renderAchievementsTab()}
          {activeTab === 'settings' && renderSettingsTab()}
        </View>

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
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  userCard: {
    margin: 20,
    marginBottom: 16,
    padding: 20,
    backgroundColor: 'white',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    fontSize: 40,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 4,
  },
  userJoinDate: {
    fontSize: 14,
    color: '#94A3B8',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabButtonActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: 'white',
    fontWeight: '600',
  },
  tabContent: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  streakCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  streakIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F59E0B',
    marginBottom: 8,
  },
  streakSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  levelCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  pointsText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#64748B',
  },
  courseItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  courseThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  courseThumbnailText: {
    fontSize: 24,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
    lineHeight: 20,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  courseProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lastAccessed: {
    fontSize: 12,
    color: '#94A3B8',
  },
  achievementCard: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: 'white',
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementIconLocked: {
    opacity: 0.5,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#94A3B8',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  achievementDescriptionLocked: {
    color: '#CBD5E1',
  },
  achievementDate: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  settingCard: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: 'white',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  settingArrow: {
    fontSize: 18,
    color: '#6366F1',
    fontWeight: 'bold',
  },
  logoutContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  logoutButton: {
    borderColor: '#EF4444',
  },
  bottomSpacing: {
    height: 100,
  },
}); 