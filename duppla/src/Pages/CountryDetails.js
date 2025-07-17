
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CountryDetails.css';


export default function CountryDetails() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fields=name,flags,population,region,subregion,capital,currencies,languages`)
      .then(res => res.json())
      .then(data => setCountry(data[0]));
  }, [name]);

  if (!country) {
    return <div>Cargando...</div>;
  }

  // Helper to render currencies
  const renderCurrencies = (currencies) => {
    if (!currencies) return '—';
    return Object.entries(currencies).map(([code, { name, symbol }]) => (
      <span key={code}>{name} ({symbol}) [{code}]</span>
    ));
  };

  // Helper to render languages
  const renderLanguages = (languages) => {
    if (!languages) return '—';
    return Object.values(languages).join(', ');
  };

  // Helper to render native names
  const renderNativeNames = (nativeName) => {
    if (!nativeName) return '—';
    return Object.entries(nativeName).map(([lang, names]) => (
      <span key={lang}>{names.official} ({names.common}) [{lang}]</span>
    ));
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, padding: '24px 32px 0 32px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ fontSize: 24, fontWeight: 700, padding: '12px 32px', borderRadius: 8, border: '2px solid #333', background: '#fff', color: '#333', boxShadow: '0 2px 8px #0002', cursor: 'pointer' }}
        >
          ← Regresar
        </button>
        <img src="/duppla.svg" alt="Duppla logo" style={{ height: 56 }} />
      </header>
      <div className="country-details-animate" style={{ padding: 24, maxWidth: 600, margin: '40px auto 0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 16 }}>
          {country.name?.common || country.name}
        </h1>
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={country.flags?.alt || country.name?.common}
          style={{ width: '200px', height: 'auto', marginBottom: 16, borderRadius: 8, boxShadow: '0 2px 8px #0002' }}
        />
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: 8 }}><strong>Nombre oficial:</strong> {country.name?.official || '—'}</li>
          <li style={{ marginBottom: 8 }}><strong>Nombre nativo:</strong> {renderNativeNames(country.name?.nativeName)}</li>
          <li style={{ marginBottom: 8 }}><strong>Capital:</strong> {country.capital?.join(', ') || '—'}</li>
          <li style={{ marginBottom: 8 }}><strong>Región:</strong> {country.region || '—'}</li>
          <li style={{ marginBottom: 8 }}><strong>Subregión:</strong> {country.subregion || '—'}</li>
          <li style={{ marginBottom: 8 }}><strong>Población:</strong> {country.population?.toLocaleString() || '—'}</li>
          <li style={{ marginBottom: 8 }}><strong>Moneda(s):</strong> {renderCurrencies(country.currencies)}</li>
          <li style={{ marginBottom: 8 }}><strong>Idioma(s):</strong> {renderLanguages(country.languages)}</li>
          <li style={{ marginBottom: 8 }}><strong>Bandera:</strong> {country.flags?.alt || '—'}</li>
        </ul>
      </div>
    </div>
  );
}