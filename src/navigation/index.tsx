import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useAuthContext } from '../contexts/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import SplashScreen from '../screens/splash/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';

type Phase = 'splash' | 'onboarding' | 'app';

export default function AppNavigation() {
  const { user, initialized } = useAuthContext();
  const [phase, setPhase] = useState<Phase>('splash');

  const handleSplashFinish = async () => {
    const seen = await SecureStore.getItemAsync('onboarding_done');
    setPhase(seen ? 'app' : 'onboarding');
  };

  const handleOnboardingFinish = async () => {
    await SecureStore.setItemAsync('onboarding_done', 'true');
    setPhase('app');
  };

  if (phase === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (phase === 'onboarding') {
    return <OnboardingScreen onFinish={handleOnboardingFinish} />;
  }

  // Wait for auth to initialize before showing app
  if (!initialized) {
    return <SplashScreen onFinish={() => {}} />;
  }

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
