import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export const Card = () => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.location}>Trivandrum</Text>
        <View style={styles.tempContainer}>
          <Text style={styles.temperature}>23°</Text>
          <Text style={styles.unit}>C</Text>
        </View>
        <Text style={styles.weatherType}>Partly Cloudy</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>68%</Text>
            <Text style={styles.detailLabel}>Humidity</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>12 km/h</Text>
            <Text style={styles.detailLabel}>Wind</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>10%</Text>
            <Text style={styles.detailLabel}>Rain</Text>
          </View>
        </View>
      </View>
      <View style={styles.accent} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginVertical: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    position: 'relative',
    ...(Platform.OS === 'web' && {
      maxWidth: 400,
      alignSelf: 'center',
      width: '100%',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }),
  },
  content: {
    padding: 24,
  },
  location: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  temperature: {
    fontSize: 48,
    fontWeight: '300',
    color: '#1A1A1A',
  },
  unit: {
    fontSize: 24,
    fontWeight: '300',
    color: '#1A1A1A',
    marginTop: 8,
  },
  weatherType: {
    fontSize: 18,
    color: '#505050',
    marginBottom: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  detailLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#EEEEEE',
  },
  accent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 6,
    height: '100%',
    backgroundColor: '#4ECDC4',
  },
}); 