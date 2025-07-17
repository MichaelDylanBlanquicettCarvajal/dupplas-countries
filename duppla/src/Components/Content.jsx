import React from 'react'

export default function Content() {
  return (
    <div className="pt-[10vh] min-h-screen bg-gray-100">
      <div className="flex flex-col h-full">
        <div className="h-1/2 bg-blue-100 flex items-center justify-center">
          <h2 className="text-xl font-bold">Parte superior del contenido</h2>
        </div>
        <div className="h-1/2 bg-green-100 flex items-center justify-center">
          <h2 className="text-xl font-bold">Parte inferior del contenido</h2>
        </div>
      </div>
    </div>

  )
}
