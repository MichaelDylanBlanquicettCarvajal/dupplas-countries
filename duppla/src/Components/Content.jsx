import React from 'react'

export default function Content() {
    return (

        <div
            className="relative h-[300px] bg-cover bg-center rounded-lg shadow-md overflow-hidden"
            style={{
                backgroundImage: "url('https://static.wikia.nocookie.net/virtualyoutuber/images/c/c6/Inugami_Korone_Portrait.png/revision/latest?cb=20190405185913')", // Cambia por tu imagen real
            }}
        >
            {/* 🧾 Overlay con los textos en el 40% inferior */}
            <div className="absolute bottom-0 left-0 w-full h-[40%] bg-black/50 flex flex-col justify-center px-8 text-white space-y-2">
                <p className="text-lg">Texto 1</p>
                <p className="text-lg">Texto 2</p>
                <p className="text-lg">Texto 3</p>
                <p className="text-lg">Texto 4</p>
                <p className="text-lg">Texto 5</p>
                <p className="text-lg">Texto 6</p>
            </div>
        </div>
    );

}
