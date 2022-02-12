import ListMenuItems from '../ListMenuItems/ListMenuItems';
import './MeatBallMenu.css';
const MeatBallMenu = ({ onSelectedItem, items, selectedItem }) => {
  return (
    <div className='meatball-menu'>
      <span className='dots' />
      <div className='dropdown-content'>
        <ListMenuItems
          items={items}
          onSelectedClick={onSelectedItem}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  );
};

export default MeatBallMenu;
