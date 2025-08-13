import 'react-native-url-polyfill/auto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string;
          created_at: string;
          updated_at: string;
          last_login: string;
          is_active: boolean;
          role: 'student' | 'instructor' | 'admin';
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
          last_login?: string;
          is_active?: boolean;
          role?: 'student' | 'instructor' | 'admin';
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
          last_login?: string;
          is_active?: boolean;
          role?: 'student' | 'instructor' | 'admin';
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          instructor_id: string;
          thumbnail_url?: string;
          price: number;
          status: 'draft' | 'published' | 'archived';
          created_at: string;
          updated_at: string;
          category: string;
          level: 'beginner' | 'intermediate' | 'advanced';
          duration_hours: number;
          rating: number;
          total_students: number;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          instructor_id: string;
          thumbnail_url?: string;
          price: number;
          status?: 'draft' | 'published' | 'archived';
          created_at?: string;
          updated_at?: string;
          category: string;
          level?: 'beginner' | 'intermediate' | 'advanced';
          duration_hours: number;
          rating?: number;
          total_students?: number;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          instructor_id?: string;
          thumbnail_url?: string;
          price?: number;
          status?: 'draft' | 'published' | 'archived';
          created_at?: string;
          updated_at?: string;
          category?: string;
          level?: 'beginner' | 'intermediate' | 'advanced';
          duration_hours?: number;
          rating?: number;
          total_students?: number;
        };
      };
      lessons: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          description: string;
          video_url: string;
          duration_minutes: number;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          description: string;
          video_url: string;
          duration_minutes: number;
          order_index: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          description?: string;
          video_url?: string;
          duration_minutes?: number;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          enrolled_at: string;
          progress_percentage: number;
          last_accessed: string;
          completed_at?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          enrolled_at?: string;
          progress_percentage?: number;
          last_accessed?: string;
          completed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          enrolled_at?: string;
          progress_percentage?: number;
          last_accessed?: string;
          completed_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          completed: boolean;
          completed_at?: string;
          watch_time_seconds: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          completed?: boolean;
          completed_at?: string;
          watch_time_seconds?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          completed?: boolean;
          completed_at?: string;
          watch_time_seconds?: number;
        };
      };
    };
  };
}

// Create Supabase client
export const supabase: SupabaseClient<Database> = createClient<Database>(
  'https://jljjwictuugpuqujmktz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsamp3aWN0dXVncHVxdWpta3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjI1MjksImV4cCI6MjA2OTc5ODUyOX0.fkVovwGZ6mW37dgnma8nHNi_6UOZEekMBMQu7pNBiCA',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

// Authentication service
export class AuthService {
  // Sign up with email and password
  static async signUp(email: string, password: string, fullName: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'student',
          },
        },
      });

      if (error) throw error;

      // Don't create profile yet - wait for email verification
      // Profile will be created automatically when user first logs in after verification
      console.log('📧 Verification email sent to:', data.user?.email);

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Sign in with email and password
  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Update last login
      if (data.user) {
        await supabase
          .from('users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.user.id);
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Sign out
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  // Get current user
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      // If user exists but profile doesn't, create it
      if (user && user.email) {
        try {
          await AuthService.ensureUserProfile(user);
        } catch (profileError) {
          console.warn('⚠️ Profile creation failed, but continuing:', profileError);
          // Don't fail the entire login if profile creation fails
        }
      }
      
      return { user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  }

  // Ensure user profile exists (create if missing)
  static async ensureUserProfile(user: any) {
    try {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!existingProfile) {
        // Create profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || 'User',
            role: 'student',
          });

        if (profileError) {
          console.error('❌ Failed to create user profile:', profileError.message);
          throw profileError;
        } else {
          console.log('✅ User profile created successfully');
        }
      }
    } catch (error) {
      console.error('❌ Profile creation failed:', error);
      throw error;
    }
  }

  // Get user profile
  static async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return { profile: data, error: null };
    } catch (error) {
      return { profile: null, error };
    }
  }

  // Update user profile
  static async updateUserProfile(userId: string, updates: Partial<Database['public']['Tables']['users']['Update']>) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { profile: data, error: null };
    } catch (error) {
      return { profile: null, error };
    }
  }
}

// Course service
export class CourseService {
  // Get all published courses
  static async getPublishedCourses() {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:users!courses_instructor_id_fkey(full_name, avatar_url)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { courses: data, error: null };
    } catch (error) {
      return { courses: null, error };
    }
  }

  // Get course by ID with lessons
  static async getCourseById(courseId: string) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:users!courses_instructor_id_fkey(full_name, avatar_url),
          lessons(*)
        `)
        .eq('id', courseId)
        .single();

      if (error) throw error;
      return { course: data, error: null };
    } catch (error) {
      return { course: null, error };
    }
  }

  // Enroll user in course
  static async enrollInCourse(userId: string, courseId: string) {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .insert({
          user_id: userId,
          course_id: courseId,
          progress_percentage: 0,
        })
        .select()
        .single();

      if (error) throw error;
      return { enrollment: data, error: null };
    } catch (error) {
      return { enrollment: null, error };
    }
  }

  // Get user enrollments
  static async getUserEnrollments(userId: string) {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          course:courses(*)
        `)
        .eq('user_id', userId)
        .order('enrolled_at', { ascending: false });

      if (error) throw error;
      return { enrollments: data, error: null };
    } catch (error) {
      return { enrollments: null, error };
    }
  }

  // Update lesson progress
  static async updateLessonProgress(userId: string, lessonId: string, completed: boolean, watchTimeSeconds: number) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          completed,
          watch_time_seconds: watchTimeSeconds,
          completed_at: completed ? new Date().toISOString() : null,
        })
        .select()
        .single();

      if (error) throw error;
      return { progress: data, error: null };
    } catch (error) {
      return { progress: null, error };
    }
  }
}

// Admin service
export class AdminService {
  // Get platform statistics
  static async getPlatformStats() {
    try {
      const [
        { count: totalUsers },
        { count: totalCourses },
        { count: totalEnrollments },
      ] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('courses').select('*', { count: 'exact', head: true }),
        supabase.from('enrollments').select('*', { count: 'exact', head: true }),
      ]);

      return {
        stats: {
          totalUsers: totalUsers || 0,
          totalCourses: totalCourses || 0,
          totalEnrollments: totalEnrollments || 0,
        },
        error: null,
      };
    } catch (error) {
      return { stats: null, error };
    }
  }

  // Get pending course approvals
  static async getPendingCourseApprovals() {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:users!courses_instructor_id_fkey(full_name, email)
        `)
        .eq('status', 'draft')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { courses: data, error: null };
    } catch (error) {
      return { courses: null, error };
    }
  }

  // Approve course
  static async approveCourse(courseId: string) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .update({ status: 'published' })
        .eq('id', courseId)
        .select()
        .single();

      if (error) throw error;
      return { course: data, error: null };
    } catch (error) {
      return { course: null, error };
    }
  }

  // Reject course
  static async rejectCourse(courseId: string) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .update({ status: 'archived' })
        .eq('id', courseId)
        .select()
        .single();

      if (error) throw error;
      return { course: data, error: null };
    } catch (error) {
      return { course: null, error };
    }
  }
}

// Initialize and validate
export const initializeSupabase = async () => {
  try {
    console.log('🔌 Initializing Supabase...');
    console.log('📡 URL: https://jljjwictuugpuqujmktz.supabase.co');
    console.log('🔑 Anon Key: Set');
    
    // Test connection
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.warn('⚠️ Supabase connection warning:', error.message);
    } else {
      console.log('✅ Supabase connected successfully');
    }
    
    return { success: true, error: null };
  } catch (error) {
    console.error('❌ Supabase initialization failed:', error);
    return { success: false, error };
  }
}; 