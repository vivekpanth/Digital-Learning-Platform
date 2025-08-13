-- Digital Learning Platform Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin');
CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE course_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    role user_role DEFAULT 'student'
);

-- Courses table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    instructor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    thumbnail_url TEXT,
    price DECIMAL(10,2) DEFAULT 0.00,
    status course_status DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    category VARCHAR(100) NOT NULL,
    level course_level DEFAULT 'beginner',
    duration_hours INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_students INTEGER DEFAULT 0
);

-- Lessons table
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 0,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enrollments table
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    progress_percentage INTEGER DEFAULT 0,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, course_id)
);

-- User progress table
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    watch_time_seconds INTEGER DEFAULT 0,
    UNIQUE(user_id, lesson_id)
);

-- Achievements table
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon TEXT,
    criteria JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements table
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_lessons_course ON lessons(course_id);
CREATE INDEX idx_lessons_order ON lessons(course_id, order_index);
CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson ON user_progress(lesson_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, read);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can view their own profile and public instructor profiles
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view instructor profiles" ON users
    FOR SELECT USING (role = 'instructor');

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Public can view published courses
CREATE POLICY "Public can view published courses" ON courses
    FOR SELECT USING (status = 'published');

-- Instructors can manage their own courses
CREATE POLICY "Instructors can manage own courses" ON courses
    FOR ALL USING (auth.uid() = instructor_id);

-- Admins can manage all courses
CREATE POLICY "Admins can manage all courses" ON courses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Public can view lessons for published courses
CREATE POLICY "Public can view lessons for published courses" ON lessons
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM courses WHERE id = lessons.course_id AND status = 'published'
        )
    );

-- Instructors can manage lessons for their courses
CREATE POLICY "Instructors can manage lessons for own courses" ON lessons
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM courses WHERE id = lessons.course_id AND instructor_id = auth.uid()
        )
    );

-- Users can view their own enrollments
CREATE POLICY "Users can view own enrollments" ON enrollments
    FOR SELECT USING (auth.uid() = user_id);

-- Users can enroll in courses
CREATE POLICY "Users can enroll in courses" ON enrollments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own enrollment progress
CREATE POLICY "Users can update own enrollment progress" ON enrollments
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can view their own progress
CREATE POLICY "Users can view own progress" ON user_progress
    FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update own progress" ON user_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- Public can view achievements
CREATE POLICY "Public can view achievements" ON achievements
    FOR SELECT USING (true);

-- Users can view their own achievements
CREATE POLICY "Users can view own achievements" ON user_achievements
    FOR SELECT USING (auth.uid() = user_id);

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own notifications
CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Create functions for common operations

-- Function to update course rating
CREATE OR REPLACE FUNCTION update_course_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE courses 
    SET rating = (
        SELECT AVG(rating) 
        FROM user_progress up
        JOIN lessons l ON up.lesson_id = l.id
        WHERE l.course_id = NEW.course_id
    )
    WHERE id = NEW.course_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update course total students
CREATE OR REPLACE FUNCTION update_course_total_students()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE courses 
        SET total_students = total_students + 1
        WHERE id = NEW.course_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE courses 
        SET total_students = total_students - 1
        WHERE id = OLD.course_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update course progress
CREATE OR REPLACE FUNCTION update_course_progress()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE enrollments 
    SET progress_percentage = (
        SELECT ROUND(
            (COUNT(CASE WHEN up.completed THEN 1 END) * 100.0 / COUNT(*))
        )
        FROM lessons l
        LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = NEW.user_id
        WHERE l.course_id = (
            SELECT course_id FROM lessons WHERE id = NEW.lesson_id
        )
    )
    WHERE user_id = NEW.user_id 
    AND course_id = (
        SELECT course_id FROM lessons WHERE id = NEW.lesson_id
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER trigger_update_course_rating
    AFTER INSERT OR UPDATE ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_course_rating();

CREATE TRIGGER trigger_update_course_total_students
    AFTER INSERT OR DELETE ON enrollments
    FOR EACH ROW
    EXECUTE FUNCTION update_course_total_students();

CREATE TRIGGER trigger_update_course_progress
    AFTER INSERT OR UPDATE ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_course_progress();

-- Insert sample data

-- Insert sample users
INSERT INTO users (email, full_name, role) VALUES
('admin@example.com', 'Admin User', 'admin'),
('instructor1@example.com', 'John Doe', 'instructor'),
('instructor2@example.com', 'Sarah Johnson', 'instructor'),
('student1@example.com', 'Alice Smith', 'student');

-- Insert sample courses
INSERT INTO courses (title, description, instructor_id, category, level, duration_hours, price) VALUES
('Complete React Native Masterclass', 'Learn React Native from scratch to advanced concepts', 
 (SELECT id FROM users WHERE email = 'instructor1@example.com'), 'Programming', 'intermediate', 25, 99.99),
('Advanced JavaScript Concepts', 'Master modern JavaScript and ES6+ features', 
 (SELECT id FROM users WHERE email = 'instructor2@example.com'), 'Programming', 'advanced', 20, 79.99),
('UI/UX Design Fundamentals', 'Learn the basics of user interface and experience design', 
 (SELECT id FROM users WHERE email = 'instructor1@example.com'), 'Design', 'beginner', 15, 59.99);

-- Insert sample lessons
INSERT INTO lessons (course_id, title, description, video_url, duration_minutes, order_index) VALUES
((SELECT id FROM courses WHERE title = 'Complete React Native Masterclass'), 'Introduction to React Native', 'Get started with React Native development', 'https://example.com/video1.mp4', 15, 1),
((SELECT id FROM courses WHERE title = 'Complete React Native Masterclass'), 'Setting up Development Environment', 'Configure your development environment', 'https://example.com/video2.mp4', 20, 2),
((SELECT id FROM courses WHERE title = 'Advanced JavaScript Concepts'), 'ES6+ Features', 'Learn modern JavaScript features', 'https://example.com/video3.mp4', 25, 1);

-- Insert sample achievements
INSERT INTO achievements (title, description, icon) VALUES
('First Course Completed', 'Completed your first course', '🎯'),
('Week Warrior', 'Maintained a 7-day learning streak', '🔥'),
('Knowledge Seeker', 'Completed 5 courses', '📚'),
('Speed Learner', 'Completed a course in under 2 weeks', '⚡');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated; 