import { Platform } from 'react-native';

// Android emulator uses 10.0.2.2 to reach the host machine's localhost
// iOS simulator can use localhost directly
// Physical device: change to your machine's actual IP (run `ipconfig` on Windows)
const DEV_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const API_BASE_URL = __DEV__
  ? `http://${DEV_HOST}:3000`
  : 'https://petsin.pk';

export const MOBILE_HEADERS = {
  'Content-Type': 'application/json',
  'X-Client-Type': 'mobile',
} as const;
