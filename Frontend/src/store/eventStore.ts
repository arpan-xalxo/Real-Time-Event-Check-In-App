import { create } from 'zustand';

interface Attendee {
  id: string;
  name: string;
  email: string;
}

interface Event {
  id: string;
  name: string;
  location: string;
  startTime: string;
  attendees: Attendee[];
}

interface EventState {
  joinedEvents: string[];
  currentEvent: Event | null;
  joinEvent: (eventId: string) => void;
  setCurrentEvent: (event: Event) => void;
  updateEventAttendees: (eventId: string, attendees: Attendee[]) => void;
}

export const eventStore = create<EventState>((set, get) => ({
  joinedEvents: [],
  currentEvent: null,
  joinEvent: (eventId: string) => set((state) => ({
    joinedEvents: [...state.joinedEvents, eventId],
  })),
  setCurrentEvent: (event: Event) => set({ currentEvent: event }),
  updateEventAttendees: (eventId: string, attendees: Attendee[]) => set((state) => ({
    currentEvent: state.currentEvent?.id === eventId 
      ? { ...state.currentEvent, attendees }
      : state.currentEvent,
  })),
})); 