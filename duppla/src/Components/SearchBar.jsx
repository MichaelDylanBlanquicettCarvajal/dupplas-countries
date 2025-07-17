import React from 'react'

export default function SearchBar() {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[70%] h-[10vh] bg-white/80 backdrop-blur-md shadow-md rounded-lg flex items-center justify-between px-4 z-50">
      <div className="flex w-[40%] justify-between items-center h-full">
        <img src="https://via.placeholder.com/40" alt="Logo" className="h-3/4" />
      </div>

      <div className="w-[60%] h-full flex items-center">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full h-2/3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Enlace
        </button>
      </div>
    </div>
  )
}
