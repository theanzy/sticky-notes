import './SidePane.css';
import {
  MdOutlineFolder,
  MdOutlineCreateNewFolder,
  MdOutlineDeleteForever,
  MdOutlineNotes,
} from 'react-icons/md';
import { useState } from 'react';
const SidePane = ({
  items,
  selectedItemId,
  selectedItemUpdated,
  handleAddItem,
  handleDeleteItem,
  showAllItems,
}) => {
  const [folderName, setFolderName] = useState('');
  const addNewFolder = () => {
    if (folderName.length > 0) {
      handleAddItem(folderName);
      setFolderName('');
    }
  };

  const onItemChanged = (e, item) => {
    const updatedItem = { ...item, name: e.target.value };
    selectedItemUpdated(updatedItem);
  };

  const onItemSelected = (item) => {
    if (item.id !== selectedItemId) {
      selectedItemUpdated(item);
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      addNewFolder();
    }
  };

  const onItemDeleted = (item) => {
    handleDeleteItem(item);
  };

  return (
    <div className='sidebar'>
      <div className='folders-title'>
        <MdOutlineFolder size={20} /> <span>Folders</span>
      </div>
      <div className='add-new-item'>
        <input
          type='text'
          value={folderName}
          placeholder='Add new folder'
          className='new-item-text'
          onKeyUp={(e) => handleKeyUp(e)}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <MdOutlineCreateNewFolder
          className='clickable'
          size={20}
          onClick={addNewFolder}
        />
      </div>
      <div
        className={`show-all-items item ${
          selectedItemId.length === 0 ? 'active' : ''
        }`}
        onClick={() => showAllItems()}>
        <MdOutlineNotes size={20} /> <span>Show all</span>
      </div>

      <div>
        {items.map((item) => (
          <div
            key={item.id}
            className={`item ${selectedItemId === item.id ? 'active' : ''}`}>
            <input
              onClick={() => onItemSelected(item)}
              className='item-text'
              onChange={(e) => onItemChanged(e, item)}
              value={item.name}
            />
            <MdOutlineDeleteForever
              className='delete-item'
              size={20}
              onClick={() => onItemDeleted(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidePane;