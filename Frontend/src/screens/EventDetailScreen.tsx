import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useMutation } from '@apollo/client';
import { JOIN_EVENT, LEAVE_EVENT } from '../graphql/mutations';
import { AttendeeList } from '../components/AttendeeList';
import { authStore } from '../store/authStore';
import { eventStore } from '../store/eventStore';
import { socketManager } from '../utils/socket';

export const EventDetailScreen = ({ route, navigation }: any) => {
  const { event } = route.params;
  const [currentEvent, setCurrentEvent] = useState(event);
  const [isJoined, setIsJoined] = useState(false);
  
  const user = authStore((state) => state.user);
  const [joinEvent] = useMutation(JOIN_EVENT);
  const [leaveEvent] = useMutation(LEAVE_EVENT);

  useEffect(() => {
    eventStore.getState().setCurrentEvent(currentEvent);
    socketManager.connect();
    
    const userAttending = currentEvent.attendees.some(
      (attendee: any) => attendee.id === user?.id
    );
    setIsJoined(userAttending);

    return () => {
      socketManager.disconnect();
    };
  }, [currentEvent, user]);

  const handleJoinEvent = async () => {
    try {
      const { data } = await joinEvent({
        variables: { eventId: currentEvent.id },
      });

      const updatedEvent = data.joinEvent;
      setCurrentEvent(updatedEvent);
      setIsJoined(true);
      
      if (user) {
        socketManager.joinEvent(currentEvent.id, user.id);
      }

      Alert.alert('Success', 'You have joined the event!');
    } catch (error) {
      Alert.alert('Error', 'Failed to join event. Please try again.');
    }
  };

  const handleLeaveEvent = async () => {
    try {
      const { data } = await leaveEvent({
        variables: { eventId: currentEvent.id },
      });
      const updatedEvent = data.leaveEvent;
      setCurrentEvent(updatedEvent);
      setIsJoined(false);
      Alert.alert('You have left the event.');
    } catch (error) {
      Alert.alert('Error', 'Failed to leave event. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{currentEvent.name}</Text>
        <Text style={styles.location}>📍 {currentEvent.location}</Text>
        <Text style={styles.time}>🕒 {formatDate(currentEvent.startTime)}</Text>
      </View>

      <View style={styles.attendeeSection}>
        <Text style={styles.sectionTitle}>
          Attendees ({currentEvent.attendees.length})
        </Text>
        <AttendeeList attendees={currentEvent.attendees} />
      </View>

      <View style={styles.actionSection}>
        {!isJoined ? (
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinEvent}>
            <Text style={styles.joinButtonText}>Join Event</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveEvent}>
            <Text style={styles.leaveButtonText}>Leave Event</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
    color: '#666',
  },
  attendeeSection: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionSection: {
    padding: 15,
  },
  joinButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  leaveButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  leaveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 