import './ListMenuItems.css';
import './ColorBox';
import ColorBox from './ColorBox';
const ListMenuItems = ({ items, onSelectedClick, selectedItem }) => {
  return (
    <div className='list-menu-items'>
      {items.map((item, i) => (
        <div key={i} className='menu-item'>
          <input
            data-color={item}
            id={item}
            type='radio'
            name='items'
            value={item}
          />
          <label
            data-color={item}
            htmlFor={item}
            onClick={() => onSelectedClick(item)}>
            <ColorBox color={item} selectedColor={selectedItem} />
          </label>
        </div>
      ))}
    </div>
  );
};
export default ListMenuItems;
