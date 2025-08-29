import 'dotenv/config';

export default {
  expo: {
    name: "Digital Learning Platform",
    slug: "digital-learning-platform",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.digitallearning.app",
      buildNumber: "1.0.0"
    },
    android: {
      package: "com.digitallearning.app",
      versionCode: 1
    },
    extra: {
      SUPABASE_URL: process.env.SUPABASE_URL || 'https://jljjwictuugpuqujmktz.supabase.co',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsamp3aWN0dXVncHVxdWpta3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjI1MjksImV4cCI6MjA2OTc5ODUyOX0.fkVovwGZ6mW37dgnma8nHNi_6UOZEekMBMQu7pNBiCA',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsamp3aWN0dXVncHVxdWpta3R6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDIyMjUyOSwiZXhwIjoyMDY5Nzk4NTI5fQ.6b1sxSp32iPKlR2SNOzocsA2uHsNelACj18gHumBIr4',
      APP_NAME: process.env.APP_NAME || 'Digital Learning Platform',
      APP_VERSION: process.env.APP_VERSION || '1.0.0',
      APP_ENVIRONMENT: process.env.APP_ENVIRONMENT || 'development',
      ENABLE_PUSH_NOTIFICATIONS: process.env.ENABLE_PUSH_NOTIFICATIONS || 'true',
      ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS || 'true',
      ENABLE_OFFLINE_MODE: process.env.ENABLE_OFFLINE_MODE || 'false',
      API_TIMEOUT: process.env.API_TIMEOUT || '30000',
      MAX_FILE_UPLOAD_SIZE: process.env.MAX_FILE_UPLOAD_SIZE || '100000000',
      JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
      REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || '30d',
      eas: {
        projectId: "0aed62af-7fd2-4370-81d2-01ad8d1eefff"
      }
    },
    plugins: [
      [
        "expo-notifications",
        {
          "color": "#6366F1"
        }
      ],
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ],
      "expo-font"
    ]
  }
}; 