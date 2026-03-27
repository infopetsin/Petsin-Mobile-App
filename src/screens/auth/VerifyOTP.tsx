import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { verifyOtp } from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';
import { decodeJWT, tokenStorage } from '../../lib/tokenStorage';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'VerifyOTP'>;
  route: RouteProp<AuthStackParamList, 'VerifyOTP'>;
};

export default function VerifyOTP({ navigation, route }: Props) {
  const { email, fullName, password, phone } = route.params;
  const { setSession } = useAuthContext();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.replace(/\s/g, '').length < 6) {
      Alert.alert('Error', 'Please enter the 6-digit code');
      return;
    }
    setLoading(true);
    const { user, error } = await verifyOtp(email, otp, fullName, password, phone);
    setLoading(false);
    if (error) {
      Alert.alert('Verification Failed', error.message);
      return;
    }
    const token = await tokenStorage.getAccessToken();
    const payload = token ? decodeJWT(token) : null;
    if (payload?.sub) {
      setSession(
        { id: payload.sub as string, email: payload.email as string, role: (payload.role as string) || 'user' },
        user
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✉️</Text>
      <Text style={styles.title}>Verify your email</Text>
      <Text style={styles.subtitle}>
        We sent a 6-digit code to{'\n'}
        <Text style={styles.emailText}>{email}</Text>
      </Text>
      <Input
        placeholder="Enter 6-digit code"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        style={{ textAlign: 'center', fontSize: 22, letterSpacing: 8 } as any}
      />
      {loading ? (
        <ActivityIndicator color="#2b6cb0" style={{ marginVertical: 8 }} />
      ) : (
        <Button title="Verify & Create Account" onPress={handleVerify} />
      )}
      <Button
        title="Back"
        variant="link"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  icon: { fontSize: 56, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#1a202c', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 28, lineHeight: 22 },
  emailText: { fontWeight: '600', color: '#2b6cb0' },
});
