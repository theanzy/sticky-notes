import React from 'react';
import './SidePane.css';
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
  onDropItem,
}) => {
  const onItemChanged = (item, value) => {
    const updatedItem = { ...item, name: value };
    selectedItemUpdated(updatedItem);
  };
  return (
    <div className='sidebar'>
      <div className='folders-title'>
        <MdOutlineFolder size={'1.5rem'} /> <span>Folders</span>
      </div>
      <AddNewItem onAddNewItem={handleAddItem} />
      <div
        className={`show-all-items item ${
          selectedItemId.length === 0 ? 'active' : ''
        }`}
        onClick={() => showAllItems()}>
        <MdOutlineNotes size={'1.3rem'} /> <span>Show all</span>
      </div>
      <div>
        {items.map((item) => (
          <EditableItem
            key={item.id}
            selectedItemId={selectedItemId}
            item={item}
            onItemSelected={(item) => onItemSelected(item.id)}
            onValueChanged={(value) => onItemChanged(item, value)}
            onItemDeleted={() => handleDeleteItem(item)}
            onDropItem={onDropItem}
          />
        ))}
      </div>
    </div>
  );
};

export default SidePane;
