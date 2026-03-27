import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { forgotPassword } from '../../services/authService';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
};

export default function ForgotPassword({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    setLoading(true);
    const { error } = await forgotPassword(email);
    setLoading(false);
    if (error) {
      Alert.alert('Error', error.message);
      return;
    }
    setSent(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Reset Password</Text>
      {sent ? (
        <View>
          <Text style={styles.successText}>
            Password reset link sent to {email}. Check your inbox.
          </Text>
          <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
        </View>
      ) : (
        <>
          <Text style={styles.subtitle}>
            Enter your email and we'll send you a link to reset your password.
          </Text>
          <Input
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {loading ? (
            <ActivityIndicator color="#2b6cb0" style={{ marginVertical: 8 }} />
          ) : (
            <Button title="Send reset link" onPress={handleReset} />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  back: { position: 'absolute', top: 60, left: 24 },
  backText: { color: '#2b6cb0', fontSize: 16 },
  title: { fontSize: 26, fontWeight: '700', color: '#1a202c', marginBottom: 12 },
  subtitle: { color: '#666', marginBottom: 24, lineHeight: 22 },
  successText: { color: '#276749', fontSize: 15, lineHeight: 22, marginBottom: 24 },
});
