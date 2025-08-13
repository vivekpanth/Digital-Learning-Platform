import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const { width, height } = Dimensions.get('window');

// Mock course data
const mockCourses = [
  {
    id: 1,
    title: 'Complete React Native Masterclass',
    instructor: 'John Doe',
    rating: 4.8,
    students: 15420,
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://via.placeholder.com/300x200/6366F1/FFFFFF?text=RN',
    category: 'Mobile Development',
    level: 'Beginner',
    duration: '25 hours',
    lessons: 156,
    isEnrolled: false,
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Advanced JavaScript Concepts',
    instructor: 'Sarah Johnson',
    rating: 4.9,
    students: 8920,
    price: 69.99,
    originalPrice: 99.99,
    image: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=JS',
    category: 'Web Development',
    level: 'Advanced',
    duration: '18 hours',
    lessons: 98,
    isEnrolled: true,
    isFeatured: false,
  },
  {
    id: 3,
    title: 'Python for Data Science',
    instructor: 'Mike Chen',
    rating: 4.7,
    students: 12350,
    price: 79.99,
    originalPrice: 119.99,
    image: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=PY',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '22 hours',
    lessons: 134,
    isEnrolled: false,
    isFeatured: true,
  },
  {
    id: 4,
    title: 'UI/UX Design Fundamentals',
    instructor: 'Emily Rodriguez',
    rating: 4.6,
    students: 6780,
    price: 59.99,
    originalPrice: 89.99,
    image: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=UX',
    category: 'Design',
    level: 'Beginner',
    duration: '16 hours',
    lessons: 87,
    isEnrolled: false,
    isFeatured: false,
  },
  {
    id: 5,
    title: 'Machine Learning Basics',
    instructor: 'David Kim',
    rating: 4.8,
    students: 11200,
    price: 99.99,
    originalPrice: 149.99,
    image: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=ML',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '28 hours',
    lessons: 167,
    isEnrolled: false,
    isFeatured: true,
  },
  {
    id: 6,
    title: 'Full Stack Web Development',
    instructor: 'Alex Thompson',
    rating: 4.7,
    students: 9450,
    price: 119.99,
    originalPrice: 179.99,
    image: 'https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=FS',
    category: 'Web Development',
    level: 'Advanced',
    duration: '35 hours',
    lessons: 203,
    isEnrolled: false,
    isFeatured: false,
  },
];

const categories = [
  'All',
  'Mobile Development',
  'Web Development',
  'Data Science',
  'Design',
  'Business',
  'Marketing',
];

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

interface CourseListingScreenProps {
  onBack: () => void;
  onCoursePress: (courseId: number) => void;
}

export default function CourseListingScreen({
  onBack,
  onCoursePress,
}: CourseListingScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price'>('popular');

  // Filter and search courses
  const filteredCourses = useMemo(() => {
    let filtered = mockCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort courses
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'price':
        filtered.sort((a, b) => a.price - b.price);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  const renderCourseCard = ({ item: course }: { item: typeof mockCourses[0] }) => (
    <TouchableOpacity
      style={[styles.courseCard, viewMode === 'list' && styles.courseCardList]}
      onPress={() => onCoursePress(course.id)}
      activeOpacity={0.8}
    >
      <View style={styles.courseImageContainer}>
        <View style={[styles.courseImage, { backgroundColor: getCategoryColor(course.category) }]}>
          <Text style={styles.courseImageText}>{getCategoryInitials(course.category)}</Text>
        </View>
        {course.isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>⭐ Featured</Text>
          </View>
        )}
        {course.isEnrolled && (
          <View style={styles.enrolledBadge}>
            <Text style={styles.enrolledText}>✓ Enrolled</Text>
          </View>
        )}
      </View>
      
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle} numberOfLines={2}>
          {course.title}
        </Text>
        <Text style={styles.courseInstructor}>by {course.instructor}</Text>
        
        <View style={styles.courseMeta}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStar}>⭐</Text>
            <Text style={styles.ratingText}>{course.rating}</Text>
            <Text style={styles.studentsText}>({course.students.toLocaleString()})</Text>
          </View>
          
          <View style={styles.courseStats}>
            <Text style={styles.statText}>⏱️ {course.duration}</Text>
            <Text style={styles.statText}>📚 {course.lessons} lessons</Text>
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>${course.price}</Text>
          {course.originalPrice > course.price && (
            <Text style={styles.originalPrice}>${course.originalPrice}</Text>
          )}
        </View>
        
        <Button
          title={course.isEnrolled ? "Continue Learning" : "Enroll Now"}
          onPress={() => onCoursePress(course.id)}
          variant={course.isEnrolled ? "outline" : "primary"}
          style={styles.enrollButton}
        />
      </View>
    </TouchableOpacity>
  );

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Mobile Development': '#6366F1',
      'Web Development': '#F59E0B',
      'Data Science': '#10B981',
      'Design': '#8B5CF6',
      'Business': '#EF4444',
      'Marketing': '#06B6D4',
    };
    return colors[category] || '#64748B';
  };

  const getCategoryInitials = (category: string) => {
    return category.split(' ').map(word => word[0]).join('').substring(0, 2);
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
        <Text style={styles.headerTitle}>Browse Courses</Text>
        <TouchableOpacity style={styles.viewToggle}>
          <Text style={styles.viewToggleText}>
            {viewMode === 'grid' ? '⊞' : '☰'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search courses, instructors..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Level and Sort */}
          <View style={styles.filterRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.levelsScroll}>
              {levels.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.levelChip,
                    selectedLevel === level && styles.levelChipActive
                  ]}
                  onPress={() => setSelectedLevel(level)}
                >
                  <Text style={[
                    styles.levelChipText,
                    selectedLevel === level && styles.levelChipTextActive
                  ]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.sortButton}
              onPress={() => {
                const sortOptions: ('popular' | 'newest' | 'price')[] = ['popular', 'newest', 'price'];
                const currentIndex = sortOptions.indexOf(sortBy);
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                setSortBy(sortOptions[nextIndex]);
              }}
            >
              <Text style={styles.sortButtonText}>
                Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} ↓
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* View Mode Toggle */}
        <View style={styles.viewModeContainer}>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'grid' && styles.viewModeButtonActive]}
            onPress={() => setViewMode('grid')}
          >
            <Text style={[styles.viewModeText, viewMode === 'grid' && styles.viewModeTextActive]}>
              ⊞ Grid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'list' && styles.viewModeButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <Text style={[styles.viewModeText, viewMode === 'list' && styles.viewModeTextActive]}>
              ☰ List
            </Text>
          </TouchableOpacity>
        </View>

        {/* Results Count */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        {/* Courses Grid/List */}
        <View style={[
          styles.coursesContainer,
          viewMode === 'grid' && styles.coursesGrid
        ]}>
          {filteredCourses.map((course) => (
            <View key={course.id} style={viewMode === 'grid' ? styles.gridItem : styles.listItem}>
              {renderCourseCard({ item: course })}
            </View>
          ))}
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
  viewToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewToggleText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoriesScroll: {
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryChipActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  categoryChipText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  levelsScroll: {
    flex: 1,
  },
  levelChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  levelChipActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  levelChipText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  levelChipTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sortButtonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  viewModeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  viewModeButtonActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  viewModeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  viewModeTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  resultsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  resultsText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  coursesContainer: {
    paddingHorizontal: 20,
  },
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: (width - 60) / 2,
    marginBottom: 20,
  },
  listItem: {
    marginBottom: 20,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  courseCardList: {
    flexDirection: 'row',
  },
  courseImageContainer: {
    position: 'relative',
  },
  courseImage: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseImageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  enrolledBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  enrolledText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  courseInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
    lineHeight: 22,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  courseMeta: {
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingStar: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginRight: 4,
  },
  studentsText: {
    fontSize: 12,
    color: '#64748B',
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: 12,
    color: '#64748B',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#64748B',
    textDecorationLine: 'line-through',
  },
  enrollButton: {
    marginTop: 0,
  },
  bottomSpacing: {
    height: 100,
  },
}); 