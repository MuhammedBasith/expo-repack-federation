import { Federated } from '@callstack/repack/client';
import { Suspense, lazy } from 'react';
import { Text, SafeAreaView, View, StyleSheet, ScrollView, Platform } from 'react-native';

// For web, we use different import approach than for native
let App1: React.ComponentType<any>;
let App2: React.ComponentType<any>;

if (Platform.OS === 'web') {
  // For web, use webpack 5 module federation
  // The dynamic import syntax is simpler and more reliable
  App1 = lazy(() => import('app1/App'));
  App2 = lazy(() => import('app2/App'));
} else {
  // For mobile, use Federated.importModule
  App1 = lazy(() => Federated.importModule('app1', './App'));
  App2 = lazy(() => Federated.importModule('app2', './App'));
}

export default function App() {
  // Use a container that adapts to web or mobile
  const Container = Platform.OS === 'web' ? View : SafeAreaView;
  
  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Card Collection</Text>
        
        <View style={styles.cardContainer}>
          <Text style={styles.sectionTitle}>Weather Info</Text>
          <Suspense fallback={<View style={styles.loadingCard}><Text style={styles.loadingText}>Loading card...</Text></View>}>
            <App1 />
          </Suspense>
        </View>
        
        <View style={styles.cardContainer}>
          <Text style={styles.sectionTitle}>Stopwatch</Text>
          <Suspense fallback={<View style={styles.loadingCard}><Text style={styles.loadingText}>Loading card...</Text></View>}>
            <App2 />
          </Suspense>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  scrollContainer: {
    padding: 16,
    ...(Platform.OS === 'web' && {
      maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: 20,
      paddingBottom: 40,
    }),
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D1D1F',
    textAlign: 'center',
    marginVertical: 24,
  },
  cardContainer: {
    marginBottom: 24,
    ...(Platform.OS === 'web' && {
      maxWidth: 450,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 8,
    marginLeft: 16,
    ...(Platform.OS === 'web' && {
      textAlign: 'center',
      marginLeft: 0,
    }),
  },
  loadingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    ...(Platform.OS === 'web' && {
      maxWidth: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    }),
  },
  loadingText: {
    color: '#8E8E93',
  },
});