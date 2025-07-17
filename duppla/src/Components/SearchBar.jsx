import React, { useState, useRef } from 'react';
export default function SearchBar({ onSearch, onSelectRegion }) {


  const [loading, setLoading] = useState(false);
  const debounceRef = useRef();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      console.log('Buscando:', value);
      if (onSearch) onSearch(value);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[80%] h-[8vh] bg-white/40 backdrop-blur-md shadow-md rounded-full flex items-center px-4 gap-6 z-50">
      {/* 🖼️ Logo */}
      <div className="w-[20%] h-full flex items-center justify-center hidden md:flex">
        <img
          src="/duppla.svg"
          alt="Duppla"
          className="h-2/3 object-contain"
        />
      </div>

      {/* 🔍 Input de búsqueda */}
      <div className="w-[60%] h-full flex items-center relative">
        <input
          type="text"
          placeholder="Buscar país, capital, región..."
          className="w-full h-2/3 px-4 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white/80 shadow-sm"
          onChange={handleInputChange}
        />
        {loading && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center text-xl">⏳</span>
        )}
      </div>

      {/* 🌍 Filtro de continente */}
      <div className="w-[20%] h-2/3 flex justify-center">
        <select
          className="px-3 py-2 rounded-full border border-gray-300 bg-white/90 shadow-sm focus:outline-none"
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
  );
}