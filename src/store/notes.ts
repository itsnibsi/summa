import { create } from 'zustand';
import { Note } from '../types';

type State = {
  notes: Note[];
};

export const useNotes = create<State>((_set) => ({
  notes: [],
}));

export const addNote = (note: Note) => {
  useNotes.setState((state) => ({ notes: [...state.notes, note] }));
}

export const updateNote = (note: Note) => {
  useNotes.setState((state) => ({
    notes: state.notes.map((n) => (n.id === note.id ? note : n)),
  }));
}

export const deleteNote = (note: Note) => {
  useNotes.setState((state) => ({
    notes: state.notes.filter((n) => n.id !== note.id),
  }));
}
