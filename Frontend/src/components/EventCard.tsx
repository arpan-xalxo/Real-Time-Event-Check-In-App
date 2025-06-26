import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Event {
  id: string;
  name: string;
  location: string;
  startTime: string;
  attendees: Array<{
    id: string;
    name: string;
  }>;
}

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export const EventCard = ({ event, onPress }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.attendeeCount}>
          {event.attendees.length} attending
        </Text>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.location}>📍 {event.location}</Text>
        <Text style={styles.time}>🕒 {formatDate(event.startTime)}</Text>
      </View>
      
      {event.attendees.length > 0 && (
        <View style={styles.attendees}>
          <Text style={styles.attendeesTitle}>Attendees:</Text>
          <Text style={styles.attendeesList}>
            {event.attendees.slice(0, 3).map(a => a.name).join(', ')}
            {event.attendees.length > 3 && ` +${event.attendees.length - 3} more`}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  attendeeCount: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  details: {
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  attendees: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  attendeesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  attendeesList: {
    fontSize: 12,
    color: '#666',
  },
}); 