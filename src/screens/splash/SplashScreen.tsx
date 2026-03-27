import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <img src="assets/Container.png" alt="Petsin Logo" />
      <Text style={styles.paw}>🐾</Text>
      <Text style={styles.title}>Petsin</Text>
      <Text style={styles.subtitle}>Connecting Pakistan's Pet Community</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paw: {
    fontSize: 90,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
  },
});
