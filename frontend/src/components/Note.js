import { useEffect, useMemo } from 'react';
import { MdClose } from 'react-icons/md';
import MeatBallMenu from './MeatBallMenu/MeatBallMenu';
import debounce from 'lodash/debounce';
import Editor from './Editor/Editor';
import './Colors.css';
const Note = ({
  id,
  content,
  date,
  color,
  handleDeleteNote,
  handleNoteUpdated,
}) => {
  const items = ['red', 'pink', 'green', 'blue', 'gray', 'yellow', 'orange'];

  const updateContent = (content) => {
    debouncedSaveNote({
      id: id,
      date: date,
      content: content,
      color: color,
    });
  };

  const debouncedSaveNote = useMemo(() => debounce(handleNoteUpdated, 500), []);
  useEffect(() => {
    return () => {
      debouncedSaveNote.cancel();
    };
  }, []);

  const changeColor = (newColor) => {
    handleNoteUpdated({
      id: id,
      date: date,
      content: content,
      color: newColor,
    });
  };

  return (
    <div className={`note ${color}`}>
      <div className={`note-header ${color}-header`}>
        <MdClose
          onClick={() => handleDeleteNote(id)}
          className='md-icon'
          size='1.3em'
        />
        <MeatBallMenu
          onSelectedItem={changeColor}
          items={items}
          selectedItem={color}
        />
      </div>
      <div className='note-header-2'>
        <small>{date}</small>
      </div>
      <Editor htmlContent={content} onContentChange={updateContent} />
    </div>
  );
};

export default Note;
