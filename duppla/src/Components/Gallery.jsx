import React from 'react'
import Content from './Content';

export default function Gallery() {
    const contentItems = Array.from({ length: 9 }); // Puedes cambiar a 6, 12, etc.
    return (
        <div className="absolute bottom-0 w-full h-[90vh] px-6 py-8 bg-cover bg-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {contentItems.map((_, index) => (
                    <Content key={index} />
                ))}
            </div>
        </div>
    );
}
