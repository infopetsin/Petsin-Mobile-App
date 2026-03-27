import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    icon: '🩺',
    title: 'Find Trusted\nPet Experts',
    description: 'Discover verified vets, groomers & pet services across Pakistan',
    bg: '#e8f0fe',
  },
  {
    icon: '📅',
    title: 'Book Appointments\nEasily',
    description: 'Schedule clinic or home visits in seconds',
    bg: '#e6f4ea',
  },
  {
    icon: '🐾',
    title: 'Everything Your\nPet Needs',
    description: 'Grooming, training, adoption & wellness in one app',
    bg: '#fce8e6',
  },
];

type Props = {
  onFinish: () => void;
};

export default function OnboardingScreen({ onFinish }: Props) {
  const [current, setCurrent] = useState(0);
  const isLast = current === SLIDES.length - 1;
  const slide = SLIDES[current];

  const handleNext = () => {
    if (isLast) {
      onFinish();
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Skip button */}
      {!isLast && (
        <TouchableOpacity style={styles.skipBtn} onPress={onFinish}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Image / Illustration area */}
      <View style={[styles.imageArea, { backgroundColor: slide.bg }]}>
        <Text style={styles.icon}>{slide.icon}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Dot indicators */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === current ? styles.dotActive : styles.dotInactive]}
            />
          ))}
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>

        <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.buttonText}>{isLast ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipBtn: {
    position: 'absolute',
    top: 56,
    right: 24,
    zIndex: 10,
  },
  skipText: {
    fontSize: 15,
    color: '#555',
    fontWeight: '500',
  },

  // Image area — replace with <Image> when you have real images
  imageArea: {
    width: width,
    height: height * 0.48,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  icon: {
    fontSize: 110,
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 32,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: '#2563eb',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#d1d5db',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 34,
  },
  description: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
    marginBottom: 36,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
