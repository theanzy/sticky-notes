import React from 'react';
import { MdSearch } from 'react-icons/md';

const Search = ({ onChange }) => {
  return (
    <div className='search'>
      <MdSearch className='search-icons' size='1.3em' />
      <input
        onChange={(event) => onChange(event.target.value)}
        type='text'
        placeholder='type to search...'></input>
    </div>
  );
};

export default Search;
