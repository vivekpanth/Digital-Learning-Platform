import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';

import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import CourseDetailsScreen from './screens/CourseDetailsScreen';
import VideoLessonScreen from './screens/VideoLessonScreen';
import CourseListingScreen from './screens/CourseListingScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';
import { initializeSupabase } from './services/supabase';

// Main App Component
function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'onboarding' | 'login' | 'signup' | 'main' | 'courseListing' | 'courseDetails' | 'videoLesson' | 'profile' | 'admin'>('splash');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [isSupabaseInitialized, setIsSupabaseInitialized] = useState(false);

  useEffect(() => {
    // Initialize Supabase
    const initSupabase = async () => {
      try {
        const { success, error } = await initializeSupabase();
        if (success) {
          console.log('✅ Supabase initialized successfully');
          setIsSupabaseInitialized(true);
        } else {
          console.error('❌ Supabase initialization failed:', error);
        }
      } catch (error) {
        console.error('❌ Supabase initialization error:', error);
      }
    };

    initSupabase();

    // Show splash for 3 seconds, then go to onboarding
    const timer = setTimeout(() => {
      setCurrentScreen('onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setCurrentScreen('login');
  };

  const handleOnboardingSkip = () => {
    setCurrentScreen('login');
  };

  const handleNavigateToSignUp = () => {
    setCurrentScreen('signup');
  };

  const handleNavigateToLogin = () => {
    setCurrentScreen('login');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentScreen('main');
  };

  const handleSignUpSuccess = () => {
    // After successful signup, show verification message
    Alert.alert(
      'Verification Email Sent',
      'We\'ve sent you a verification email. Please check your inbox and click the verification link to activate your account. You\'ll be able to login after verification.',
      [
        {
          text: 'OK',
          onPress: () => setCurrentScreen('login'),
        },
      ]
    );
  };

  const handleNavigateToCourseListing = () => {
    setCurrentScreen('courseListing');
  };

  const handleNavigateToCourse = (courseId: number) => {
    setSelectedCourseId(courseId);
    setCurrentScreen('courseDetails');
  };

  const handleBackFromCourseListing = () => {
    setCurrentScreen('main');
  };

  const handleNavigateToProfile = () => {
    setCurrentScreen('profile');
  };

  const handleBackFromProfile = () => {
    setCurrentScreen('main');
  };

  const handleNavigateToAdmin = () => {
    setCurrentScreen('admin');
  };

  const handleBackFromAdmin = () => {
    setCurrentScreen('main');
  };

  const handleBackFromCourse = () => {
    setCurrentScreen('main');
    setSelectedCourseId(null);
  };

  const handleEnrollCourse = (courseId: number) => {
    // TODO: Handle course enrollment
    console.log('Enrolling in course:', courseId);
  };

  const handleLessonPress = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    setCurrentScreen('videoLesson');
  };

  const handleBackFromLesson = () => {
    setCurrentScreen('courseDetails');
    setSelectedLessonId(null);
  };

  const handleNextLesson = () => {
    // TODO: Navigate to next lesson
    console.log('Next lesson');
  };

  const handlePreviousLesson = () => {
    // TODO: Navigate to previous lesson
    console.log('Previous lesson');
  };

  const handleMarkLessonComplete = (lessonId: number) => {
    // TODO: Mark lesson as complete in backend
    console.log('Lesson completed:', lessonId);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
    setSelectedCourseId(null);
    setSelectedLessonId(null);
  };

  return (
    <>
      <StatusBar style="auto" />
      
      {/* Render the appropriate screen based on current state */}
      {currentScreen === 'splash' && <SplashScreen />}
      
      {currentScreen === 'onboarding' && (
        <OnboardingScreen 
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
      
      {currentScreen === 'login' && (
        <LoginScreen 
          onNavigateToSignUp={handleNavigateToSignUp}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      {currentScreen === 'signup' && (
        <SignUpScreen 
          onNavigateToLogin={handleNavigateToLogin}
          onSignUpSuccess={handleSignUpSuccess}
        />
      )}
      
      {currentScreen === 'main' && (
        <HomeScreen 
          onNavigateToCourse={handleNavigateToCourse}
          onNavigateToCourseListing={handleNavigateToCourseListing}
          onNavigateToProfile={handleNavigateToProfile}
          onNavigateToAdmin={handleNavigateToAdmin}
        />
      )}

      {currentScreen === 'courseListing' && (
        <CourseListingScreen
          onBack={handleBackFromCourseListing}
          onCoursePress={handleNavigateToCourse}
        />
      )}

      {currentScreen === 'courseDetails' && selectedCourseId && (
        <CourseDetailsScreen
          onEnroll={handleEnrollCourse}
          onLessonPress={handleLessonPress}
          onBack={handleBackFromCourse}
        />
      )}

      {currentScreen === 'videoLesson' && selectedLessonId && (
        <VideoLessonScreen
          onBack={handleBackFromLesson}
          onNextLesson={handleNextLesson}
          onPreviousLesson={handlePreviousLesson}
          onMarkComplete={handleMarkLessonComplete}
        />
      )}

      {currentScreen === 'profile' && (
        <UserProfileScreen
          onBack={handleBackFromProfile}
          onCoursePress={handleNavigateToCourse}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'admin' && (
        <AdminPanelScreen
          onBack={handleBackFromAdmin}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App; 