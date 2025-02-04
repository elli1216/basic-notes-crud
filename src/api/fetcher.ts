import axios from 'axios';
import { Note } from '../types/note';

const baseURL = 'http://localhost:3000/api';

export const fetchNotes = async () => {
  try {
    const response = await axios.get(`${baseURL}/notes`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Network response was not ok');
  }
};

export const addNote = async (note: Note): Promise<Note> => {
  try {
    const response = await axios.post<Note>(`${baseURL}/notes`, note, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Network response was not ok');
  }
};

export const updateNote = async (note: Note): Promise<Note> => {
  try {
    const response = await axios.put(`${baseURL}/notes/${note.id}`, note, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Network response was not ok');
  }
}

export const deleteNote = async (id: number) => {
  try {
    const response = await axios.delete(`${baseURL}/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Network response was not ok');
  }
}

export const fetchNoteById = async (id: number) => {
  try {
    const response = await axios.get(`${baseURL}/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Network response was not ok');
  }
}