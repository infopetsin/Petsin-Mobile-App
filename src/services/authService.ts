import { API_BASE_URL, MOBILE_HEADERS } from '../constants/api';
import { tokenStorage, isTokenExpired } from '../lib/tokenStorage';

async function post(path: string, body: object) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: MOBILE_HEADERS,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

export async function signIn(emailOrPhone: string, password: string) {
  const { ok, data } = await post('/api/auth/login', { emailOrPhone, password });
  if (!ok) return { user: null, error: { message: data.error || 'Login failed' } };
  await tokenStorage.setTokens(data.access_token, data.refresh_token);
  return { user: data.user, error: null };
}

export async function signUp(
  email: string,
  password: string,
  fullName: string,
  phone?: string
) {
  const { ok, data } = await post('/api/auth/signup', {
    email,
    password,
    fullName,
    phone: phone || undefined,
  });
  if (!ok) return { error: { message: data.error || 'Signup failed' }, otpEmail: null };
  return { error: null, otpEmail: data.otpEmail as string };
}

export async function verifyOtp(
  email: string,
  otp: string,
  fullName: string,
  password: string,
  phone?: string
) {
  const { ok, data } = await post('/api/auth/verify-otp', {
    email,
    otp,
    fullName,
    password,
    phone: phone || undefined,
  });
  if (!ok) return { user: null, error: { message: data.error || 'Verification failed' } };
  await tokenStorage.setTokens(data.access_token, data.refresh_token);
  return { user: data.user, error: null };
}

export async function refreshTokens() {
  const refreshToken = await tokenStorage.getRefreshToken();
  if (!refreshToken) return false;
  const { ok, data } = await post('/api/auth/refresh', { refresh_token: refreshToken });
  if (!ok) {
    await tokenStorage.clearTokens();
    return false;
  }
  await tokenStorage.setTokens(data.access_token, data.refresh_token);
  return true;
}

export async function signOut() {
  const refreshToken = await tokenStorage.getRefreshToken();
  if (refreshToken) {
    await post('/api/auth/logout', { refresh_token: refreshToken }).catch(() => {});
  }
  await tokenStorage.clearTokens();
}

export async function getValidAccessToken(): Promise<string | null> {
  const accessToken = await tokenStorage.getAccessToken();
  if (!accessToken) return null;
  if (isTokenExpired(accessToken)) {
    const refreshed = await refreshTokens();
    if (!refreshed) return null;
    return tokenStorage.getAccessToken();
  }
  return accessToken;
}

export async function forgotPassword(email: string) {
  const { ok, data } = await post('/api/auth/forgot-password', { identifier: email });
  if (!ok) return { error: { message: data.error || 'Failed to send reset link' } };
  return { error: null };
}
