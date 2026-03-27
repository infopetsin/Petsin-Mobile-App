import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { signUp } from '../../services/authService';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Signup'>;
};

export default function Signup({ navigation }: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Error', 'Full name, email and password are required');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    const { error, otpEmail } = await signUp(email, password, fullName, phone);
    setLoading(false);
    if (error) {
      Alert.alert('Signup Failed', error.message);
      return;
    }
    // Navigate to OTP verification with signup data
    navigation.navigate('VerifyOTP', { email: otpEmail!, fullName, password, phone });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>PETSIN</Text>
      <Text style={styles.title}>Create account</Text>
      <Input placeholder="Full name" value={fullName} onChangeText={setFullName} />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Phone (optional)"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Input
        placeholder="Password (min. 6 characters)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator color="#2b6cb0" style={styles.loader} />
      ) : (
        <Button title="Continue" onPress={handleSignUp} />
      )}
      <Button
        title="Already have an account? Login"
        variant="link"
        onPress={() => navigation.navigate('Login')}
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
