import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAuthContext } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';

export default function Home() {
  const { user, profile, clearSession } = useAuthContext();

  const handleSignOut = () => {
    Alert.alert('Sign out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: clearSession },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>PETSIN</Text>
      <Text style={styles.welcome}>
        Welcome{profile?.full_name ? `, ${profile.full_name}` : user?.email ? `, ${user.email}` : ''}!
      </Text>
      <Text style={styles.role}>Role: {user?.role ?? 'user'}</Text>
      <Button title="Sign out" variant="link" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  brand: { fontSize: 34, fontWeight: '800', color: '#2b6cb0', marginBottom: 16 },
  welcome: { fontSize: 20, fontWeight: '600', color: '#1a202c', marginBottom: 6 },
  role: { fontSize: 13, color: '#888', marginBottom: 32 },
});
