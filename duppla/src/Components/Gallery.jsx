import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// const ITEMS_PER_PAGE = 9;

export default function Gallery({ search = '', region = '' }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital')
      .then(res => res.json())
      .then((data) => {
        const parsed = data.map((item) => ({
          flags: item.flags,
          name: item.name,
          population: item.population,
          region: item.region,
          subregion: item.subregion,
          capital: item.capital || ['—'],
        }));
        setCountries(parsed);
      })
      .finally(() => setLoading(false));
  }, []);

  // Animación de carga al buscar o filtrar
  useEffect(() => {
    if (countries.length === 0) return;
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [search, region, countries.length]);

  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [slideDirection, setSlideDirection] = useState(null); // 'left' | 'right' | null
  const prevPageRef = useRef(1);

  // Filtrado eficiente usando Country type
  const filteredCountries = countries
    .filter(country => !region || country.region === region)
    .filter(country => {
      if (!search) return true;
      const text = search.toLowerCase();
      return (
        country.name.common.toLowerCase().includes(text) ||
        country.capital.join(', ').toLowerCase().includes(text) ||
        country.region.toLowerCase().includes(text) ||
        (country.subregion?.toLowerCase().includes(text) ?? false)
      );
    });

  // Paginación sobre los filtrados
  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filteredCountries.slice(start, start + ITEMS_PER_PAGE);

  // Detectar dirección de animación
  useEffect(() => {
    if (currentPage > prevPageRef.current) {
      setSlideDirection('right');
    } else if (currentPage < prevPageRef.current) {
      setSlideDirection('left');
    } else {
      setSlideDirection(null);
    }
    prevPageRef.current = currentPage;
  }, [currentPage]);

  // Navegación con teclado (PC)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        if (currentPage > 1) {
          setSlideDirection('left');
          setCurrentPage((p) => Math.max(1, p - 1));
        }
      } else if (e.key === 'ArrowRight') {
        if (currentPage < totalPages) {
          setSlideDirection('right');
          setCurrentPage((p) => Math.min(totalPages, p + 1));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  return (
    <div className="w-full min-h-[90vh] mt-[10vh] px-6 py-8 bg-cover bg-center overflow-y-auto">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${slideDirection === 'right' ? 'gallery-slide-right' : ''} ${slideDirection === 'left' ? 'gallery-slide-left' : ''}`}
        key={currentPage} // fuerza re-montaje para animación
      >
        {loading ? (
          <div className="text-center col-span-3 animate-fadein">
            <h2 className="text-2xl font-bold mb-4">Galería de países</h2>
            <span className="text-5xl animate-spin inline-block mb-2">🌎</span>
            <p className="text-cyan-700 mt-2 font-semibold">Cargando países...</p>
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className="text-center col-span-3">
            <h2 className="text-2xl font-bold mb-4">Sin resultados</h2>
            <p className="text-gray-600">No se encontraron países con los filtros actuales.</p>
          </div>
        ) : (
          paginated.map((country, index) => (
            <button
              key={index}
              className="relative rounded-lg shadow-md hover:shadow-lg transition w-full text-left cursor-pointer overflow-hidden flex flex-col justify-end"
              style={{
                backgroundImage: country.flags.svg ? `url(${country.flags.svg})` : 'none',
                backgroundSize: country.flags.svg ? 'contain' : 'initial',
                backgroundRepeat: country.flags.svg ? 'no-repeat' : 'initial',
                backgroundPosition: 'center',
                backgroundColor: country.flags.svg ? 'transparent' : '#e5e7eb',
                minHeight: '260px',
                height: '100%',
              }}
              onClick={() => navigate(`/CountryDetails/${encodeURIComponent(country.name.common)}`)}
            >
              <div
                className="absolute top-4 left-4"
                style={{
                  background: 'rgba(132, 255, 183, 0.35)', // light green
                  borderRadius: '0.75rem',
                  padding: '0.35rem 1rem',
                  color: '#111', // black text
                  fontWeight: 'bold',
                  fontSize: '1.15rem',
                  textAlign: 'left',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 8px #05966922',
                  zIndex: 2,
                  width: 'auto',
                  minWidth: 'fit-content',
                  maxWidth: '80%',
                  border: 'none',
                }}
              >
                {country.name.common.toUpperCase()}
              </div>
              <div
                className="absolute left-0 bottom-0 w-full"
                style={{
                  height: '40%',
                  background: 'rgba(255,255,255,0.65)', // more translucent
                  backdropFilter: 'blur(2px)',
                  borderTopLeftRadius: '0.75rem',
                  borderTopRightRadius: '0.75rem',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <p className="text-sm"><strong>Capital:</strong> {country.capital.join(', ')}</p>
                <p className="text-sm"><strong>Región:</strong> {country.region}</p>
                <p className="text-sm"><strong>Subregión:</strong> {country.subregion}</p>
                <p className="text-sm"><strong>Población:</strong> {country.population.toLocaleString()}</p>
              </div>
            </button>
          ))
        )}
      </div>
      {countries.length > ITEMS_PER_PAGE && (
        <div
          className="fixed bottom-2 left-1/2 transform -translate-x-1/2 min-w-[220px] max-w-[90vw] w-fit h-[7vh] bg-white/40 backdrop-blur-md shadow-md rounded-full flex items-center justify-center px-2 md:px-6 gap-2 md:gap-6 z-40"
          style={{ boxSizing: 'border-box' }}
        >
          <button
            onClick={() => {
              setSlideDirection('left');
              setCurrentPage((p) => Math.max(1, p - 1));
            }}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-full disabled:opacity-50 text-xl"
          >
            ◀
          </button>
          <span className="hidden md:inline px-4 py-2 text-lg font-semibold">
            Página {currentPage} de {totalPages}
          </span>
          <span className="md:hidden px-4 py-2 text-lg font-semibold">
            {currentPage}
          </span>
          <button
            onClick={() => {
              setSlideDirection('right');
              setCurrentPage((p) => Math.min(totalPages, p + 1));
            }}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-full disabled:opacity-50 text-xl"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}