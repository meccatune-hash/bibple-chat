import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bibple.chat',
  appName: 'Bibple Chat',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
