import React from 'react';
import { View, SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Card } from './Card';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{ padding: 16 }}>
        <Card />
      </View>
    </SafeAreaView>
  );
} 