import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CountryDetails.css';

export default function CountryDetails() {
    const { name } = useParams();
    const [country, setCountry] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Backspace') {
                navigate(-1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fields=name,flags,population,region,subregion,capital,currencies,languages`)
            .then(res => res.json())
            .then(data => setCountry(data[0]));
    }, [name]);

    if (!country) {
        return <div>Cargando...</div>;
    }

    const renderCurrencies = (currencies) => {
        if (!currencies) return '—';
        return Object.entries(currencies).map(([code, { name, symbol }]) => (
            <span key={code}>{name} ({symbol}) [{code}]</span>
        ));
    };

    const renderLanguages = (languages) => {
        if (!languages) return '—';
        return Object.values(languages).join(', ');
    };

    const renderNativeNames = (nativeName) => {
        if (!nativeName) return '—';
        return Object.entries(nativeName).map(([lang, names]) => (
            <span key={lang}>{names.official} ({names.common}) [{lang}]</span>
        ));
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                padding: '16px 32px',
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                boxShadow: '0 2px 12px #0001',
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        fontSize: 20,
                        fontWeight: 800,
                        padding: '12px 22px',
                        borderRadius: 999,
                        border: '2px solid #06b6d4',
                        background: 'rgba(6,182,212,0.18)',
                        color: '#111',
                        boxShadow: '0 2px 8px #06b6d422',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        minWidth: 0,
                        letterSpacing: '0.5px',
                        textTransform: 'none',
                    }}
                >
                    ← <span style={{fontWeight: 800}}>Regresar</span>
                </button>
                <img src="/duppla.svg" alt="Duppla logo" style={{ height: 56, display: 'block', margin: 0, padding: 0 }} />
            </header>

            {/* Caja superior: bandera y descripción */}
            <div
                className="countrydetails-flagbox"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    maxWidth: 1000,
                    height: '60vh',
                    minHeight: 320,
                    margin: '32px auto 0 auto',
                    borderRadius: 24,
                    overflow: 'hidden',
                    boxShadow: '0 4px 32px #0002',
                    background: 'rgba(255,255,255,0.10)',
                    backdropFilter: 'blur(2px)'
                }}
            >
                <div className="countrydetails-flagimgbox" style={{
                    width: '60%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.15)'
                }}>
                    <img
                        src={country.flags?.svg || country.flags?.png}
                        alt={country.flags?.alt || country.name?.common}
                        style={{
                            width: '90%',
                            height: '90%',
                            objectFit: 'contain',
                            borderRadius: 18,
                            boxShadow: '0 4px 24px #0002',
                            background: 'rgba(255,255,255,0.2)'
                        }}
                    />
                </div>
                <div className="countrydetails-flagdescbox" style={{
                    width: '40%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.35)',
                    backdropFilter: 'blur(2px)'
                }}>
                    <div style={{
                        fontSize: '1.7rem',
                        fontWeight: 600,
                        color: '#222',
                        textAlign: 'center',
                        padding: '32px 20px',
                        width: '100%',
                        minHeight: 120,
                        lineHeight: 1.3
                    }}>
                        {country.flags?.alt || 'Sin descripción de la bandera.'}
                    </div>
                </div>
            </div>

            {/* Detalles en tarjetas pequeñas debajo */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 20,
                maxWidth: 1000,
                margin: '24px auto 40px auto',
                padding: '0 16px',
                alignItems: 'stretch',
            }}>
                <div className="country-card-cyan">
                    <div className="country-card-cyan-title">NOMBRE OFICIAL</div>
                    <div>{country.name?.official || '—'}</div>
                </div>
                <div className="country-card-cyan">
                    <div className="country-card-cyan-title">NOMBRE NATIVO</div>
                    <div>{renderNativeNames(country.name?.nativeName)}</div>
                </div>
                <div className="country-card-cyan">
                    <div className="country-card-cyan-title">CAPITAL</div>
                    <div>{country.capital?.join(', ') || '—'}</div>
                </div>
                <div className="country-card-cyan">
                    <div className="country-card-cyan-title">REGIÓN</div>
                    <div>{country.region || '—'}</div>
                </div>
                <div className="country-card-cyan">
                    <div className="country-card-cyan-title">SUBREGIÓN</div>
                    <div>{country.subregion || '—'}</div>
                </div>
                <div className="country-card-cyan">
                    <div className="country-card-cyan-title">POBLACIÓN</div>
                    <div>{country.population?.toLocaleString() || '—'}</div>
                </div>
                <div className="country-card-cyan">
                    <div className="country-card-cyan-title">MONEDA(S)</div>
                    <div>{renderCurrencies(country.currencies)}</div>
                </div>
                <div className="country-card-cyan">
                    <div className="country-card-cyan-title">IDIOMA(S)</div>
                    <div>{renderLanguages(country.languages)}</div>
                </div>
            </div>
        </div>
    );
}