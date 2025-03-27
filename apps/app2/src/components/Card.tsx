import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

export const Card = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('Stopped');

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            setMinutes(prevMinutes => {
              if (prevMinutes === 59) {
                setHours(prevHours => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (val: number): string => {
    return val < 10 ? `0${val}` : val.toString();
  };

  const handleStartStop = () => {
    setIsActive(!isActive);
    setStatus(isActive ? 'Stopped' : 'Running');
  };

  const handleReset = () => {
    setIsActive(false);
    setStatus('Ready');
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Timer</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.time}>
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, isActive ? styles.stopButton : styles.startButton]} 
            onPress={handleStartStop}
          >
            <Text style={styles.buttonText}>{isActive ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.resetButton]} 
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FCFCFC',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    ...(Platform.OS === 'web' && {
      maxWidth: 400,
      alignSelf: 'center',
      width: '100%',
      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
    }),
  },
  header: {
    backgroundColor: '#F5F7FE',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  status: {
    fontSize: 14,
    color: '#718096',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  time: {
    fontSize: 36,
    fontWeight: '300',
    color: '#2D3748',
    marginBottom: 24,
    fontVariant: ['tabular-nums'],
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#68D391',
  },
  stopButton: {
    backgroundColor: '#FC8181',
  },
  resetButton: {
    backgroundColor: '#CBD5E0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
}); 