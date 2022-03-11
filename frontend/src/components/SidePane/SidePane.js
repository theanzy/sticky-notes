import React from 'react';
import './SidePane.css';
import { Droppable } from 'react-beautiful-dnd';
import { MdOutlineFolder, MdOutlineNotes } from 'react-icons/md';
import AddNewItem from './AddNewItem';
import EditableItem from './EditableItem';

const SidePane = ({
  items,
  selectedItemId,
  selectedItemUpdated,
  onItemSelected,
  handleAddItem,
  handleDeleteItem,
  showAllItems,
}) => {
  const onItemChanged = (item, value) => {
    const updatedItem = { ...item, name: value };
    selectedItemUpdated(updatedItem);
  };

  console.log('side pane render');
  return (
    <div className='sidebar'>
      <div className='folders-title'>
        <MdOutlineFolder size={20} /> <span>Folders</span>
      </div>
      <AddNewItem onAddNewItem={handleAddItem} />
      <div
        className={`show-all-items item ${
          selectedItemId.length === 0 ? 'active' : ''
        }`}
        onClick={() => showAllItems()}>
        <MdOutlineNotes size={20} /> <span>Show all</span>
      </div>

      <div>
        {items.map((item) => (
          <Droppable
            key={`folder_${item.id}`}
            droppableId={`folder_${item.id}`}
            type='notes-list'
            direction='horizontal'>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`item-container ${
                  snapshot.isDraggingOver ? 'dragging-over' : ''
                }`}>
                <EditableItem
                  selectedItemId={selectedItemId}
                  item={item}
                  onItemSelected={(item) => onItemSelected(item.id)}
                  onValueChanged={(value) => onItemChanged(item, value)}
                  onItemDeleted={() => handleDeleteItem(item)}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  );
};

export default SidePane;
