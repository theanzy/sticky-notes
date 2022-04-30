import React, { useState } from 'react';
import Editor from './Editor/Editor';
import { MdAdd } from 'react-icons/md';

const AddNote = ({ handleAddNote }) => {
  const [noteContent, setNoteContent] = useState('');
  const handleContentChange = (content) => {
    setNoteContent(content);
  };

  const handleSave = () => {
    if (noteContent.trim().length > 0) {
      handleAddNote(noteContent);
      setNoteContent('');
    }
  };

  return (
    <div className='note new' style={{ display: 'flex', height: '59vh' }}>
      <div className='note-header'>
        <MdAdd className='md-icon md-icon-normal' onClick={handleSave} />
      </div>
      <Editor
        htmlContent={noteContent}
        placeholder='Add a new note'
        onContentChange={handleContentChange}
      />
    </div>
  );
};

export default AddNote;
