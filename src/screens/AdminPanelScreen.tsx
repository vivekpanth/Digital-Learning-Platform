import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const { width, height } = Dimensions.get('window');

// Mock admin data
const mockAdminData = {
  stats: {
    totalUsers: 1247,
    totalCourses: 89,
    activeUsers: 892,
    totalRevenue: 45600,
    courseCompletionRate: 78,
    newUsersThisMonth: 156,
  },
  recentCourses: [
    {
      id: 1,
      title: 'Complete React Native Masterclass',
      instructor: 'John Doe',
      status: 'published',
      enrollments: 234,
      rating: 4.8,
      createdAt: '2024-03-15',
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      instructor: 'Sarah Johnson',
      status: 'pending',
      enrollments: 0,
      rating: 0,
      createdAt: '2024-03-20',
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Rodriguez',
      status: 'published',
      enrollments: 189,
      rating: 4.6,
      createdAt: '2024-03-10',
    },
  ],
  recentUsers: [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      status: 'active',
      joinDate: '2024-03-18',
      coursesEnrolled: 3,
      lastActive: '2 hours ago',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      status: 'active',
      joinDate: '2024-03-17',
      coursesEnrolled: 1,
      lastActive: '1 day ago',
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@example.com',
      status: 'suspended',
      joinDate: '2024-03-16',
      coursesEnrolled: 0,
      lastActive: '3 days ago',
    },
  ],
  pendingApprovals: [
    {
      id: 1,
      type: 'course',
      title: 'Machine Learning Basics',
      instructor: 'Mike Wilson',
      submittedAt: '2024-03-19',
    },
    {
      id: 2,
      type: 'course',
      title: 'Web Development Fundamentals',
      instructor: 'Lisa Brown',
      submittedAt: '2024-03-18',
    },
    {
      id: 3,
      type: 'user',
      name: 'David Lee',
      email: 'david@example.com',
      submittedAt: '2024-03-17',
    },
  ],
};

interface AdminPanelScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export default function AdminPanelScreen({
  onBack,
  onLogout,
}: AdminPanelScreenProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'users' | 'approvals' | 'settings'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from admin panel?',
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

  const handleApproveCourse = (courseId: number) => {
    Alert.alert(
      'Approve Course',
      'Are you sure you want to approve this course?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Approve',
          onPress: () => {
            // TODO: Approve course in backend
            console.log('Course approved:', courseId);
            Alert.alert('Success', 'Course has been approved!');
          },
        },
      ]
    );
  };

  const handleRejectCourse = (courseId: number) => {
    Alert.alert(
      'Reject Course',
      'Are you sure you want to reject this course?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            // TODO: Reject course in backend
            console.log('Course rejected:', courseId);
            Alert.alert('Success', 'Course has been rejected!');
          },
        },
      ]
    );
  };

  const handleSuspendUser = (userId: number) => {
    Alert.alert(
      'Suspend User',
      'Are you sure you want to suspend this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Suspend',
          style: 'destructive',
          onPress: () => {
            // TODO: Suspend user in backend
            console.log('User suspended:', userId);
            Alert.alert('Success', 'User has been suspended!');
          },
        },
      ]
    );
  };

  const renderDashboardTab = () => (
    <View>
      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Text style={styles.statIcon}>👥</Text>
          <Text style={styles.statNumber}>{mockAdminData.stats.totalUsers}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statIcon}>📚</Text>
          <Text style={styles.statNumber}>{mockAdminData.stats.totalCourses}</Text>
          <Text style={styles.statLabel}>Total Courses</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statIcon}>🔥</Text>
          <Text style={styles.statNumber}>{mockAdminData.stats.activeUsers}</Text>
          <Text style={styles.statLabel}>Active Users</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statIcon}>💰</Text>
          <Text style={styles.statNumber}>${mockAdminData.stats.totalRevenue.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Revenue</Text>
        </Card>
      </View>

      {/* Additional Stats */}
      <View style={styles.additionalStats}>
        <Card style={styles.additionalStatCard}>
          <Text style={styles.additionalStatTitle}>Course Completion Rate</Text>
          <Text style={styles.additionalStatValue}>{mockAdminData.stats.courseCompletionRate}%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${mockAdminData.stats.courseCompletionRate}%` }]} />
          </View>
        </Card>
        <Card style={styles.additionalStatCard}>
          <Text style={styles.additionalStatTitle}>New Users This Month</Text>
          <Text style={styles.additionalStatValue}>{mockAdminData.stats.newUsersThisMonth}</Text>
          <Text style={styles.additionalStatSubtitle}>+12% from last month</Text>
        </Card>
      </View>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      
      <Card style={styles.activityCard}>
        <Text style={styles.activityTitle}>Recent Course Publications</Text>
        {mockAdminData.recentCourses.slice(0, 3).map((course) => (
          <View key={course.id} style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>📚</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>
                <Text style={styles.activityBold}>{course.title}</Text> by {course.instructor} was published
              </Text>
              <Text style={styles.activityTime}>{course.createdAt}</Text>
            </View>
          </View>
        ))}
      </Card>
    </View>
  );

  const renderCoursesTab = () => (
    <View>
      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterChip, selectedStatus === 'all' && styles.filterChipActive]}
            onPress={() => setSelectedStatus('all')}
          >
            <Text style={[styles.filterChipText, selectedStatus === 'all' && styles.filterChipTextActive]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, selectedStatus === 'published' && styles.filterChipActive]}
            onPress={() => setSelectedStatus('published')}
          >
            <Text style={[styles.filterChipText, selectedStatus === 'published' && styles.filterChipTextActive]}>Published</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, selectedStatus === 'pending' && styles.filterChipActive]}
            onPress={() => setSelectedStatus('pending')}
          >
            <Text style={[styles.filterChipText, selectedStatus === 'pending' && styles.filterChipTextActive]}>Pending</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Course List */}
      {mockAdminData.recentCourses.map((course) => (
        <Card key={course.id} style={styles.courseCard}>
          <View style={styles.courseHeader}>
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseInstructor}>by {course.instructor}</Text>
              <View style={styles.courseMeta}>
                <Text style={styles.courseMetaText}>📊 {course.enrollments} enrollments</Text>
                <Text style={styles.courseMetaText}>⭐ {course.rating} rating</Text>
                <Text style={styles.courseMetaText}>📅 {course.createdAt}</Text>
              </View>
            </View>
            <View style={styles.courseActions}>
              <View style={[
                styles.statusBadge,
                course.status === 'published' ? styles.statusPublished : styles.statusPending
              ]}>
                <Text style={styles.statusText}>{course.status}</Text>
              </View>
              {course.status === 'pending' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.approveButton]}
                    onPress={() => handleApproveCourse(course.id)}
                  >
                    <Text style={styles.actionButtonText}>✓</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={() => handleRejectCourse(course.id)}
                  >
                    <Text style={styles.actionButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Card>
      ))}
    </View>
  );

  const renderUsersTab = () => (
    <View>
      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* User List */}
      {mockAdminData.recentUsers.map((user) => (
        <Card key={user.id} style={styles.userCard}>
          <View style={styles.userHeader}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>{user.name.charAt(0)}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <View style={styles.userMeta}>
                <Text style={styles.userMetaText}>📚 {user.coursesEnrolled} courses</Text>
                <Text style={styles.userMetaText}>🕒 {user.lastActive}</Text>
                <Text style={styles.userMetaText}>📅 {user.joinDate}</Text>
              </View>
            </View>
            <View style={styles.userActions}>
              <View style={[
                styles.statusBadge,
                user.status === 'active' ? styles.statusActive : styles.statusSuspended
              ]}>
                <Text style={styles.statusText}>{user.status}</Text>
              </View>
              {user.status === 'active' && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.suspendButton]}
                  onPress={() => handleSuspendUser(user.id)}
                >
                  <Text style={styles.actionButtonText}>⏸️</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Card>
      ))}
    </View>
  );

  const renderApprovalsTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Pending Approvals ({mockAdminData.pendingApprovals.length})</Text>
      
      {mockAdminData.pendingApprovals.map((item) => (
        <Card key={item.id} style={styles.approvalCard}>
          <View style={styles.approvalHeader}>
            <View style={styles.approvalIcon}>
              <Text style={styles.approvalIconText}>
                {item.type === 'course' ? '📚' : '👤'}
              </Text>
            </View>
            <View style={styles.approvalInfo}>
              <Text style={styles.approvalTitle}>
                {item.type === 'course' ? item.title : `${item.name} (${item.email})`}
              </Text>
              <Text style={styles.approvalSubtitle}>
                {item.type === 'course' ? `by ${item.instructor}` : 'New user registration'}
              </Text>
              <Text style={styles.approvalTime}>Submitted: {item.submittedAt}</Text>
            </View>
            <View style={styles.approvalActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.approveButton]}
                onPress={() => {
                  if (item.type === 'course') {
                    handleApproveCourse(item.id);
                  } else {
                    Alert.alert('Success', 'User approved!');
                  }
                }}
              >
                <Text style={styles.actionButtonText}>✓</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.rejectButton]}
                onPress={() => {
                  if (item.type === 'course') {
                    handleRejectCourse(item.id);
                  } else {
                    Alert.alert('Success', 'User rejected!');
                  }
                }}
              >
                <Text style={styles.actionButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );

  const renderSettingsTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Admin Preferences</Text>
      
      <Card style={styles.settingCard}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Admin Notifications</Text>
            <Text style={styles.settingDescription}>Receive notifications for pending approvals and system alerts</Text>
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
            <Text style={styles.settingTitle}>Auto-approve Courses</Text>
            <Text style={styles.settingDescription}>Automatically approve courses from verified instructors</Text>
          </View>
          <Switch
            value={autoApprove}
            onValueChange={setAutoApprove}
            trackColor={{ false: '#E2E8F0', true: '#6366F1' }}
            thumbColor={autoApprove ? '#FFFFFF' : '#FFFFFF'}
          />
        </View>
      </Card>

      <Text style={styles.sectionTitle}>System Information</Text>
      
      <Card style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Platform Version:</Text>
          <Text style={styles.infoValue}>v2.1.0</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Last Updated:</Text>
          <Text style={styles.infoValue}>March 21, 2024</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Database Status:</Text>
          <Text style={styles.infoValue}>🟢 Connected</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Storage Usage:</Text>
          <Text style={styles.infoValue}>67% (2.1GB / 3.2GB)</Text>
        </View>
      </Card>

      <View style={styles.logoutContainer}>
        <Button
          title="Logout from Admin Panel"
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
        <Text style={styles.headerTitle}>Admin Panel</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {[
            { key: 'dashboard', label: 'Dashboard', icon: '📊' },
            { key: 'courses', label: 'Courses', icon: '📚' },
            { key: 'users', label: 'Users', icon: '👥' },
            { key: 'approvals', label: 'Approvals', icon: '✅' },
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
          {activeTab === 'dashboard' && renderDashboardTab()}
          {activeTab === 'courses' && renderCoursesTab()}
          {activeTab === 'users' && renderUsersTab()}
          {activeTab === 'approvals' && renderApprovalsTab()}
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  tabButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minWidth: 80,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    marginBottom: 12,
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 12,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
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
  additionalStats: {
    marginBottom: 20,
  },
  additionalStatCard: {
    marginBottom: 12,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  additionalStatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  additionalStatValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 12,
  },
  additionalStatSubtitle: {
    fontSize: 14,
    color: '#64748B',
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
  activityCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  activityBold: {
    fontWeight: '600',
    color: '#1E293B',
  },
  activityTime: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  filterChipText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  courseCard: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  courseInfo: {
    flex: 1,
    marginRight: 16,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  courseMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  courseMetaText: {
    fontSize: 12,
    color: '#94A3B8',
    marginRight: 12,
    marginBottom: 4,
  },
  courseActions: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  statusPublished: {
    backgroundColor: '#DCFCE7',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusActive: {
    backgroundColor: '#DCFCE7',
  },
  statusSuspended: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  approveButton: {
    backgroundColor: '#10B981',
  },
  rejectButton: {
    backgroundColor: '#EF4444',
  },
  suspendButton: {
    backgroundColor: '#F59E0B',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userCard: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userAvatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  userInfo: {
    flex: 1,
    marginRight: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  userMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userMetaText: {
    fontSize: 12,
    color: '#94A3B8',
    marginRight: 12,
    marginBottom: 4,
  },
  userActions: {
    alignItems: 'center',
  },
  approvalCard: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  approvalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  approvalIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  approvalIconText: {
    fontSize: 24,
  },
  approvalInfo: {
    flex: 1,
    marginRight: 16,
  },
  approvalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  approvalSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  approvalTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  approvalActions: {
    flexDirection: 'row',
  },
  settingCard: {
    marginBottom: 12,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
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
  infoCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
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