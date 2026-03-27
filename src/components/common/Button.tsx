import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'default' | 'link';
};

export default function Button({ title, onPress, variant = 'default' }: Props) {
  if (variant === 'link') {
    return (
      <TouchableOpacity onPress={onPress} style={styles.link}>
        <Text style={styles.linkText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: '#2b6cb0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  link: { paddingVertical: 8, alignItems: 'center' },
  linkText: { color: '#2b6cb0' },
});
