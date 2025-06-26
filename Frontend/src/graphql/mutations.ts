import { gql } from '@apollo/client';

export const JOIN_EVENT = gql`
  mutation JoinEvent($eventId: ID!) {
    joinEvent(eventId: $eventId) {
      id
      name
      location
      startTime
      attendees {
        id
        name
        email
      }
    }
  }
`; 

export const LEAVE_EVENT = gql`
  mutation LeaveEvent($eventId: ID!) {
    leaveEvent(eventId: $eventId) {
      id
      name
      location
      startTime
      attendees {
        id
        name
        email
      }
    }
  }
`; 