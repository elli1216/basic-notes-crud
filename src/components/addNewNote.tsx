import React, { useEffect, useState } from 'react';
import { isEmpty } from '../utils/validation';
import { addNote } from '../api/fetcher';
import { Note } from '../types/note';

interface AddNewNoteProps {
  setShowAddNewNote: React.Dispatch<React.SetStateAction<boolean>>;
  addNewNoteToList: (newNote: Note) => void;
  note: Note;
}

const AddNewNote: React.FC<AddNewNoteProps> = ({ setShowAddNewNote, addNewNoteToList }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!isEmpty(title) && !isEmpty(content)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title, content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newNote = { title, content };

    try {
      const data = await addNote(newNote);
      console.log('Note added:', data);

      // Add the new note to the list
      addNewNoteToList(data);
      setShowAddNewNote(false);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className='fixed bottom-10 right-10 bg-white p-10 rounded-md w-96 m-auto mt-20'>
      <h1 className='text-3xl font-bold text-center'>Add New Note</h1>
      <form className='flex flex-col gap-4 mt-4' onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          className='p-2 border-2 rounded-md'
          type='text'
          id='title'
          name='title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='content'>Content</label>
        <textarea
          className='p-2 border-2 rounded-md max-h-75 min-h-50'
          id='content'
          name='content'
          onChange={(e) => setContent(e.target.value)}
        />
        <div className='flex justify-between'>
          <button
            className='bg-amber-200 p-2 rounded-md hover:bg-amber-300'
            type='button'
            onClick={() => setShowAddNewNote(false)}
          >
            Cancel
          </button>
          <button
            className='bg-amber-200 p-2 rounded-md hover:bg-amber-300'
            type='submit'
            disabled={disabled}
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewNote;