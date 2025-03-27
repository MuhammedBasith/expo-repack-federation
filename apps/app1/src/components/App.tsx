import React from 'react';
import { View, SafeAreaView, StatusBar, useColorScheme, Platform } from 'react-native';
import { Card } from './Card';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  // Use appropriate container based on platform
  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <Container style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
      {Platform.OS !== 'web' && <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />}
      <View style={{ padding: 16 }}>
        <Card />
      </View>
    </Container>
  );
} 