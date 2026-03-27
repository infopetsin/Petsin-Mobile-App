import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import Button from '../../components/common/Button';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'VerifyEmail'>;
  route: RouteProp<AuthStackParamList, 'VerifyEmail'>;
};

export default function VerifyEmail({ navigation, route }: Props) {
  const { email } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✉️</Text>
      <Text style={styles.title}>Check your email</Text>
      <Text style={styles.subtitle}>
        We sent a verification link to{'\n'}
        <Text style={styles.emailText}>{email}</Text>
      </Text>
      <Text style={styles.note}>
        Click the link in the email to verify your account, then come back to log in.
      </Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: { fontSize: 64, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: '700', color: '#1a202c', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 16, lineHeight: 24 },
  emailText: { fontWeight: '600', color: '#2b6cb0' },
  note: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 32, lineHeight: 20, paddingHorizontal: 16 },
});
