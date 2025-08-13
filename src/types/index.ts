// User related types
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  role: 'student' | 'instructor' | 'admin';
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notifications_enabled: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  theme: 'light' | 'dark' | 'auto';
}

// Course related types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  instructor_name: string;
  instructor_avatar?: string;
  thumbnail_url: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  rating: number;
  total_ratings: number;
  enrolled_students: number;
  price: number;
  is_free: boolean;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  video_url: string;
  duration: number; // in minutes
  order_index: number;
  is_free: boolean;
  created_at: string;
  updated_at: string;
}

export interface Quiz {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  time_limit?: number; // in minutes
  passing_score: number;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  points: number;
}

// Enrollment and progress types
export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at?: string;
  progress: number; // 0-100
  last_accessed: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  completed: boolean;
  completed_at?: string;
  watch_time: number; // in seconds
  quiz_score?: number;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  lesson_id: string;
  course_id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  time_taken: number; // in seconds
  completed_at: string;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  question_id: string;
  selected_answer: number;
  is_correct: boolean;
  time_spent: number; // in seconds
}

// Notification types
export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
  action_url?: string;
  action_type?: 'course' | 'lesson' | 'quiz' | 'general';
}

// Achievement types
export interface Achievement {
  id: string;
  user_id: string;
  type: 'course_completion' | 'quiz_perfect_score' | 'streak' | 'milestone';
  title: string;
  description: string;
  icon_url: string;
  earned_at: string;
  metadata?: Record<string, any>;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error: string | null;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Courses: undefined;
  Profile: undefined;
  Notifications: undefined;
};

export type CourseStackParamList = {
  CourseList: undefined;
  CourseDetails: { courseId: string };
  LessonVideo: { lessonId: string; courseId: string };
  Quiz: { quizId: string; lessonId: string; courseId: string };
};

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  accept_terms: boolean;
}

export interface ForgotPasswordForm {
  email: string;
}

// Filter and search types
export interface CourseFilters {
  category?: string;
  level?: string;
  price_range?: 'free' | 'paid' | 'all';
  rating?: number;
  duration?: 'short' | 'medium' | 'long';
}

export interface SearchParams {
  query: string;
  filters: CourseFilters;
  sort_by: 'relevance' | 'popularity' | 'rating' | 'newest' | 'price';
  sort_order: 'asc' | 'desc';
} 