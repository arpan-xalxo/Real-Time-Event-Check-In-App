import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import { authStore } from '../store/authStore';

const MOCK_USERS = [
  { name: 'Alice Johnson', email: 'alice@example.com', token: 'token-alice' },
  { name: 'Bob Smith', email: 'bob@example.com', token: 'token-bob' },
];

export const LoginScreen = ({ navigation }: any) => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const handleLogin = () => {
    if (selectedUser === null) {
      Alert.alert('Error', 'Please select a user');
      return;
    }

    const user = MOCK_USERS[selectedUser];
    authStore.getState().login(user.token, {
      id: user.token === 'token-alice' ? 'user1' : 'user2',
      name: user.name,
      email: user.email,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.centeredContainer}>
        <View style={styles.contentBox}>
      <Text style={styles.title}>Event Engage</Text>
      <Text style={styles.subtitle}>Choose a user to login:</Text>
      {MOCK_USERS.map((user, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.userButton,
            selectedUser === index && styles.selectedUser,
          ]}
          onPress={() => setSelectedUser(index)}
        >
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[styles.loginButton, selectedUser === null && styles.disabledButton]}
        onPress={handleLogin}
        disabled={selectedUser === null}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  contentBox: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    padding: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    ...(Platform.OS === 'web' && { boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }),
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  userButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  selectedUser: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
}); 