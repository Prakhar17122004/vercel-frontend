import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'


const SearchBar = ({ value, onChange, handleSearch, onClearSearch, theme }) => {
  return (
    <div className="input-group w-50 relative search-bar">
      <input
        type="text"
        className="form-control border-0 shadow-none"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />

      {value && (
        <button
          type="button"
          className="clear-icon"
          onClick={onClearSearch}
        >
          <IoMdClose size={18} />
        </button>
      )}

      <button
        type="button"
        className="search-btn"
        onClick={handleSearch}
      >
        <FaMagnifyingGlass size={18} />
      </button>
    </div>
  )
}


export default SearchBar
