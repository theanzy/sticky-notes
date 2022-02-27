import AddNote from './AddNote';
import Note from './Note';
import { Draggable, Droppable } from 'react-beautiful-dnd';
const NoteList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  handleNoteUpdated,
}) => {
  return (
    <Droppable
      droppableId='notes-list'
      isDropDisabled={true}
      direction='horizontal'
      type='notes-list'>
      {(provided) => (
        <div
          className='notes-list'
          ref={provided.innerRef}
          {...provided.droppableProps}>
          {notes.map((note, i) => (
            <Draggable key={note.id} draggableId={note.id} index={i}>
              {(providedDrag, snapshotDrag) => (
                <div
                  className={`note ${note.color} ${
                    snapshotDrag.isDragging ? 'dragging' : ''
                  }`}
                  ref={providedDrag.innerRef}
                  {...providedDrag.draggableProps}
                  {...providedDrag.dragHandleProps}>
                  <Note
                    isDragging={snapshotDrag.isDragging}
                    note={note}
                    handleDeleteNote={handleDeleteNote}
                    handleNoteUpdated={handleNoteUpdated}
                  />
                </div>
              )}
            </Draggable>
          ))}
          <AddNote handleAddNote={handleAddNote} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default NoteList;
