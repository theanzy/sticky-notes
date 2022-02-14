import { useState } from 'react';
import Editor from './Editor/Editor';

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
    <div className='note new'>
      <Editor
        htmlContent={noteContent}
        placeholder='Add a new note'
        onContentChange={handleContentChange}
      />
      <div className='note-footer'>
        <small></small>
        <button className='btn' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
