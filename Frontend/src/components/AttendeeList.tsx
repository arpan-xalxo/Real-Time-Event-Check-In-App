import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Attendee {
  id: string;
  name: string;
  email: string;
}

interface AttendeeListProps {
  attendees: Attendee[];
}

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
}

export const AttendeeList = ({ attendees }: AttendeeListProps) => {
  const renderAttendee = ({ item }: { item: Attendee }) => (
    <View style={styles.attendeeItem}>
      <View style={[styles.avatar, { backgroundColor: stringToColor(item.name) }] }>
        <Text style={styles.avatarText}>
          {item.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)}
        </Text>
      </View>
      <View style={styles.attendeeInfo}>
        <Text style={styles.attendeeName}>{item.name}</Text>
        <Text style={styles.attendeeEmail}>{item.email}</Text>
      </View>
    </View>
  );

  if (attendees.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>No attendees yet</Text>
        <Text style={styles.emptySubtext}>Be the first to join!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={attendees}
      keyExtractor={(item) => item.id}
      renderItem={renderAttendee}
      scrollEnabled={false}
    />
  );
};


const styles = StyleSheet.create({
  attendeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  attendeeInfo: {
    flex: 1,
  },
  attendeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  attendeeEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
  },
}); 