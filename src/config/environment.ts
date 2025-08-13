import Constants from 'expo-constants';

interface EnvironmentConfig {
  supabase: {
    url: string;
    anonKey: string;
    serviceRoleKey?: string;
  };
  app: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
  };
  features: {
    pushNotifications: boolean;
    analytics: boolean;
    offlineMode: boolean;
  };
  api: {
    timeout: number;
    maxFileUploadSize: number;
  };
  security: {
    jwtExpiry: string;
    refreshTokenExpiry: string;
  };
}

// Get environment variables from Expo Constants
const getEnvVar = (key: string, fallback?: string): string => {
  // Try multiple sources for environment variables
  const value = Constants.expoConfig?.extra?.[key] ||
                Constants.expoConfig?.extra?.[`EXPO_PUBLIC_${key}`] ||
                process.env[key] ||
                process.env[`EXPO_PUBLIC_${key}`] ||
                fallback;

  if (!value) {
    console.warn(`⚠️ Environment variable ${key} is not set, using fallback`);
    return fallback || '';
  }

  return value;
};

export const environment: EnvironmentConfig = {
  supabase: {
    url: 'https://jljjwictuugpuqujmktz.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsamp3aWN0dXVncHVxdWpta3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjI1MjksImV4cCI6MjA2OTc5ODUyOX0.fkVovwGZ6mW37dgnma8nHNi_6UOZEekMBMQu7pNBiCA',
    serviceRoleKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsamp3aWN0dXVncHVxdWpta3R6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDIyMjUyOSwiZXhwIjoyMDY5Nzk4NTI5fQ.6b1sxSp32iPKlR2SNOzocsA2uHsNelACj18gHumBIr4',
  },
  app: {
    name: getEnvVar('APP_NAME', 'Digital Learning Platform'),
    version: getEnvVar('APP_VERSION', '1.0.0'),
    environment: (getEnvVar('APP_ENVIRONMENT', 'development') as 'development' | 'staging' | 'production'),
  },
  features: {
    pushNotifications: getEnvVar('ENABLE_PUSH_NOTIFICATIONS', 'true') === 'true',
    analytics: getEnvVar('ENABLE_ANALYTICS', 'true') === 'true',
    offlineMode: getEnvVar('ENABLE_OFFLINE_MODE', 'false') === 'true',
  },
  api: {
    timeout: parseInt(getEnvVar('API_TIMEOUT', '30000')),
    maxFileUploadSize: parseInt(getEnvVar('MAX_FILE_UPLOAD_SIZE', '100000000')),
  },
  security: {
    jwtExpiry: getEnvVar('JWT_EXPIRY', '7d'),
    refreshTokenExpiry: getEnvVar('REFRESH_TOKEN_EXPIRY', '30d'),
  },
};

// Validate required environment variables
export const validateEnvironment = (): void => {
  if (!environment.supabase.url || !environment.supabase.anonKey) {
    throw new Error('Supabase configuration is incomplete. Please check your environment variables.');
  }
  
  console.log('✅ Environment configuration loaded successfully');
  console.log(`🌍 Environment: ${environment.app.environment}`);
  console.log(`📱 App: ${environment.app.name} v${environment.app.version}`);
}; 