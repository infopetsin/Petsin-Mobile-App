import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Petsin</Text>
      <Text style={styles.subtitle}>Your Pet Care Companion</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    color: '#e94560',
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 16,
    opacity: 0.7,
  }
});
