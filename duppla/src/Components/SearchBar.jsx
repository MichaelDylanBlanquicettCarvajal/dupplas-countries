import React, { useRef } from 'react';
export default function SearchBar({ onSearch, onSelectRegion }) {


  const debounceRef = useRef();

  const handleInputChange = (e) => {
    const value = e.target.value;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      console.log('Buscando:', value);
      if (onSearch) onSearch(value);
    }, 700);
  };

  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2 w-[96%] sm:w-[80%] h-auto sm:h-[8vh] bg-white/40 backdrop-blur-md shadow-md rounded-full flex items-center px-2 sm:px-4 gap-2 sm:gap-6 z-50">
      {/* Logo */}
      <div className="w-[18%] h-12 sm:h-full items-center justify-center hidden md:flex">
        <img
          src="/duppla.svg"
          alt="Duppla"
          className="h-2/3 object-contain"
        />
      </div>

      {/* Input y select juntos */}
      <div className="flex flex-row w-full md:w-[82%] gap-2 sm:gap-4 items-center">
        <div className="w-[65%] flex items-center">
          <input
            type="text"
            placeholder="Buscar país, capital, región..."
            className="w-full h-12 px-3 sm:px-4 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white/80 shadow-sm text-sm sm:text-base"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-[35%] min-w-24 max-w-40 flex items-center">
          <select
            className="w-full h-12 px-3 rounded-full border border-gray-300 bg-white/90 shadow-sm focus:outline-none text-sm sm:text-base"
            onChange={e => {
              console.log('Filtrando región:', e.target.value);
              if (onSelectRegion) onSelectRegion(e.target.value);
            }}
          >
            <option value="">-</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctic">Antarctic</option>
          </select>
        </div>
      </div>
    </div>
  );
}