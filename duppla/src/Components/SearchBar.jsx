import React from 'react'

export default function SearchBar() {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[80%] h-[8vh] bg-white/80 backdrop-blur-md shadow-md rounded-full flex items-center px-4 gap-6 z-50">

      <div className="w-[20%] h-full flex items-center justify-center hidden md:flex">
        <img
          src="\duppla.svg"
          alt='Duppla'
          className="h-2/3 object-contain"
        />
      </div>
      <div className="w-[60%] h-full flex items-center">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full h-2/3 px-4 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white/80"
        />
      </div>

      <div className="w-[20%] h-2/3 flex justify-center">
        <select className="py-2 rounded-full border border-gray-300 bg-white/90 shadow-sm focus:outline-none">
          <option value="">Continente</option>
          <option value="asia">Asia</option>
          <option value="africa">África</option>
          <option value="europa">Europa</option>
          <option value="america">América</option>
          <option value="oceania">Oceanía</option>
          <option value="antartida">Antártida</option>
        </select>

      </div>

    </div>
  );

}
