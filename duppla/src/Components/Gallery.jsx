import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const ITEMS_PER_PAGE = 9;

export default function Gallery({ search = '', region = '' }) {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
      });
  }, []);

  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrado eficiente
  const filteredCountries = countries
    .filter(country => !region || country.region === region)
    .filter(country => {
      if (!search) return true;
      const text = search.toLowerCase();
      return (
        country.name.common.toLowerCase().includes(text) ||
        country.capital.join(', ').toLowerCase().includes(text) ||
        country.region.toLowerCase().includes(text) ||
        country.subregion?.toLowerCase().includes(text)
      );
    });

  // Paginación sobre los filtrados
  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filteredCountries.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="w-full min-h-[90vh] mt-[10vh] px-6 py-8 bg-cover bg-center overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {countries.length === 0 ? (
          <div className="text-center col-span-3">
            <h2 className="text-2xl font-bold mb-4">Galería de países</h2>
            <p className="text-gray-600">Cargando datos...</p>
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
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition w-full text-left cursor-pointer"
              onClick={() => navigate(`/CountryDetails/${encodeURIComponent(country.name.common)}`)}
            >
              <img
                src={country.flags.svg}
                alt={country.flags.alt || country.name.common}
                className="h-24 w-full object-contain mb-4"
              />
              <h2 className="text-lg font-bold">{country.name.common}</h2>
              <p><strong>Capital:</strong> {country.capital.join(', ')}</p>
              <p><strong>Región:</strong> {country.region}</p>
              <p><strong>Subregión:</strong> {country.subregion}</p>
              <p><strong>Población:</strong> {country.population.toLocaleString()}</p>
            </button>
          ))
        )}
      </div>
      {countries.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            ◀
          </button>
          <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}