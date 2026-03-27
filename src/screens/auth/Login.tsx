import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { signIn } from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';
import { decodeJWT, tokenStorage } from '../../lib/tokenStorage';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

export default function Login({ navigation }: Props) {
  const { setSession } = useAuthContext();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    const { user, error } = await signIn(emailOrPhone, password);
    setLoading(false);
    if (error) {
      Alert.alert('Login Failed', error.message);
      return;
    }
    // Decode token to get session user, then update auth context
    const token = await tokenStorage.getAccessToken();
    const payload = token ? decodeJWT(token) : null;
    if (payload?.sub) {
      setSession({ id: payload.sub as string, email: payload.email as string, role: (payload.role as string) || 'user' }, user);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>PETSIN</Text>
      <Text style={styles.title}>Welcome back</Text>
      <Input
        placeholder="Email or phone"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Forgot password?"
        variant="link"
        onPress={() => navigation.navigate('ForgotPassword')}
      />
      {loading ? (
        <ActivityIndicator color="#2b6cb0" style={styles.loader} />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      <Button
        title="Don't have an account? Sign up"
        variant="link"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  brand: { fontSize: 34, fontWeight: '800', color: '#2b6cb0', textAlign: 'center', marginBottom: 4 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', color: '#1a202c', marginBottom: 28 },
  loader: { marginVertical: 8 },
});
