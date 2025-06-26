import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './src/graphql/client';
import { LoginScreen } from './src/screens/LoginScreen';
import { EventListScreen } from './src/screens/EventListScreen';
import { EventDetailScreen } from './src/screens/EventDetailScreen';
import { authStore } from './src/store/authStore';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function App() {
  const isAuthenticated = authStore((state) => state.isAuthenticated);

  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
              borderBottomWidth: 1,
              borderBottomColor: '#e0e0e0',
              elevation: 2,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowOffset: { width: 0, height: 2 },
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
              color: '#333',
            },
            headerTintColor: '#007AFF',
          }}
        >
          {!isAuthenticated ? (
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name="EventList" component={EventListScreen} options={{ headerShown: false }} />
              <Stack.Screen
                name="EventDetail"
                component={EventDetailScreen}
                options={({ navigation }) => ({
                  title: 'Event Details',
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 12 }}>
                      <Ionicons name="arrow-back" size={28} color="#007AFF" />
                    </TouchableOpacity>
                  ),
                })}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
} 