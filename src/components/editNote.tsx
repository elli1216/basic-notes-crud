import React, { useState } from 'react';
import { updateNote } from '../api/fetcher';
import { Note } from '../types/note';

interface EditNoteProps {
  setShowEditNote: React.Dispatch<React.SetStateAction<boolean>>;
  note: Note;
  updateNoteInList: (note: Note) => void;
}

const EditNote: React.FC<EditNoteProps> = ({ setShowEditNote, note, updateNoteInList }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedNote = { ...note, title, content };

    try {
      const data = await updateNote(updatedNote);
      console.log('Note updated:', data);
      updateNoteInList(updatedNote);
      setShowEditNote(false);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className='fixed bottom-20 left-20 bg-white p-10 rounded-md w-150 m-auto mt-20'>
      <h1 className='text-3xl font-bold text-center'>Edit Note</h1>
      <form className='flex flex-col gap-4 mt-4' onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          className='p-2 border-2 rounded-md'
          type='text'
          id='title'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='content'>Content</label>
        <textarea
          className='p-2 border-2 rounded-md max-h-75 min-h-50'
          id='content'
          name='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className='flex justify-between'>
          <button
            className='bg-amber-200 p-2 rounded-md hover:bg-amber-300'
            type='button'
            onClick={() => setShowEditNote(false)}
          >
            Cancel
          </button>
          <button className='bg-amber-200 p-2 rounded-md hover:bg-amber-300' type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;