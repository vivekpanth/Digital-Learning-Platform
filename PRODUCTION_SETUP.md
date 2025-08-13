# 🚀 Digital Learning Platform - Production Setup Guide

This guide will walk you through setting up your digital learning platform for production, including Supabase backend integration, real authentication, and deployment.

## 📋 **Prerequisites**

- ✅ Expo CLI installed globally
- ✅ Supabase account created
- ✅ Node.js 18+ installed
- ✅ Git repository set up

---

## 🔧 **Phase 1: Supabase Backend Setup**

### **Step 1: Create Supabase Project**

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up/Login** with your GitHub account
3. **Create New Project**:
   - Project name: `digital-learning-platform`
   - Database password: Create a strong password (save this!)
   - Region: Choose closest to your users
   - Pricing: Start with free tier

### **Step 2: Get Project Credentials**

1. **Go to Settings → API** in your Supabase dashboard
2. **Copy these values**:
   - **Project URL** (looks like: `https://xyz.supabase.co`)
   - **anon public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

### **Step 3: Set Up Database Schema**

1. **Go to SQL Editor** in your Supabase dashboard
2. **Copy and paste** the entire contents of `database-schema.sql`
3. **Click "Run"** to execute the schema
4. **Verify tables created** in the Table Editor

### **Step 4: Configure Environment Variables**

1. **Create `.env` file** in your project root:

```bash
# Supabase Configuration
SUPABASE_URL=your_actual_supabase_url_here
SUPABASE_ANON_KEY=your_actual_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here

# App Configuration
APP_NAME=Digital Learning Platform
APP_VERSION=1.0.0
APP_ENVIRONMENT=production

# Feature Flags
ENABLE_PUSH_NOTIFICATIONS=true
ENABLE_ANALYTICS=true
ENABLE_OFFLINE_MODE=false

# API Configuration
API_TIMEOUT=30000
MAX_FILE_UPLOAD_SIZE=100000000

# Security
JWT_EXPIRY=7d
REFRESH_TOKEN_EXPIRY=30d
```

2. **Add `.env` to `.gitignore`** (if not already there)

---

## 🔐 **Phase 2: Real Authentication Implementation**

### **Step 1: Update App.tsx with Real Auth**

The authentication is already implemented in the Supabase service. Now we need to integrate it with your app state.

### **Step 2: Test Authentication Flow**

1. **Start your app**: `npx expo start`
2. **Navigate to Sign Up**
3. **Create a test account**
4. **Verify user created** in Supabase Auth dashboard
5. **Check user profile** created in users table

### **Step 3: Verify Login Flow**

1. **Sign out** and go back to login
2. **Sign in** with your test account
3. **Verify session persists** after app restart

---

## 📚 **Phase 3: Real Course Data Integration**

### **Step 1: Add Sample Courses via Supabase**

1. **Go to Table Editor → courses**
2. **Add new courses** with real data:
   - Title, description, category, level
   - Set status to 'published'
   - Add instructor_id (use admin user ID)

### **Step 2: Add Sample Lessons**

1. **Go to Table Editor → lessons**
2. **Add lessons** for each course:
   - Title, description, video_url
   - Set order_index for proper sequencing
   - Use real video URLs (YouTube, Vimeo, etc.)

### **Step 3: Test Course Loading**

1. **Restart your app**
2. **Navigate to Course Listing**
3. **Verify real courses load** from Supabase
4. **Test course details** and video lessons

---

## 🚀 **Phase 4: Production Deployment**

### **Step 1: Build for Production**

#### **iOS Build**

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure EAS Build
eas build:configure

# Build for iOS
eas build --platform ios --profile production
```

#### **Android Build**

```bash
# Build for Android
eas build --platform android --profile production
```

### **Step 2: Configure App Store Deployment**

#### **Update app.json for Production**

```json
{
  "expo": {
    "name": "Digital Learning Platform",
    "slug": "digital-learning-platform",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.digitallearningplatform"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourcompany.digitallearningplatform"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
```

### **Step 3: Submit to App Stores**

#### **iOS App Store**

1. **Archive build** in Xcode
2. **Upload to App Store Connect**
3. **Submit for review**

#### **Google Play Store**

1. **Upload APK/AAB** to Google Play Console
2. **Fill store listing** information
3. **Submit for review**

---

## 🧪 **Testing Checklist**

### **Authentication Testing**

- [ ] User registration works
- [ ] User login works
- [ ] Session persistence works
- [ ] Logout works correctly
- [ ] Password reset works (if implemented)

### **Course Functionality Testing**

- [ ] Courses load from Supabase
- [ ] Course details display correctly
- [ ] Video lessons play properly
- [ ] Progress tracking works
- [ ] Enrollment system works

### **Admin Panel Testing**

- [ ] Admin can view all courses
- [ ] Admin can approve/reject courses
- [ ] Admin can manage users
- [ ] Statistics display correctly

### **Performance Testing**

- [ ] App loads within 3 seconds
- [ ] Images load properly
- [ ] Video streaming works smoothly
- [ ] No memory leaks

---

## 🔒 **Security Considerations**

### **Row Level Security (RLS)**

- ✅ Already configured in database schema
- ✅ Users can only access their own data
- ✅ Public access limited to published content

### **API Security**

- ✅ Supabase handles authentication
- ✅ JWT tokens with expiration
- ✅ Service role key kept secret

### **Data Validation**

- ✅ Input validation on client side
- ✅ Database constraints
- ✅ SQL injection protection via Supabase

---

## 📊 **Monitoring & Analytics**

### **Supabase Dashboard**

- Monitor database performance
- Track user authentication
- View real-time logs

### **Expo Analytics**

- App usage statistics
- Crash reporting
- Performance metrics

---

## 🚨 **Troubleshooting Common Issues**

### **Connection Issues**

```bash
# Check Supabase connection
npx expo start --clear

# Verify environment variables
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY
```

### **Build Issues**

```bash
# Clear cache
expo r -c

# Reset Metro bundler
npx expo start --clear
```

### **Database Issues**

- Check RLS policies in Supabase
- Verify table permissions
- Check SQL schema execution

---

## 📚 **Next Steps After Production**

### **Immediate (Week 1)**

- Monitor app performance
- Gather user feedback
- Fix critical bugs

### **Short Term (Month 1)**

- Add analytics tracking
- Implement push notifications
- Add payment integration

### **Long Term (Quarter 1)**

- Scale infrastructure
- Add advanced features
- Expand course catalog

---

## 🆘 **Support & Resources**

### **Documentation**

- [Expo Documentation](https://docs.expo.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Native Documentation](https://reactnative.dev/)

### **Community**

- [Expo Discord](https://discord.gg/expo)
- [Supabase Discord](https://discord.supabase.com/)
- [React Native Community](https://reactnative.dev/community)

---

## 🎯 **Success Metrics**

- **User Registration**: 100+ users in first month
- **Course Completion**: 70%+ completion rate
- **App Performance**: <3 second load time
- **User Retention**: 60%+ monthly active users

---

**🎉 Congratulations!** Your digital learning platform is now production-ready with real backend integration, authentication, and deployment capabilities.

**Need help?** Check the troubleshooting section or reach out to the community resources above.
