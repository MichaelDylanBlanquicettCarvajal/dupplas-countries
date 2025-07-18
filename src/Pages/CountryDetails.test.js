import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CountryDetails from './CountryDetails';

  render(
    <MemoryRouter initialEntries={["/CountryDetails/PaisRaro"]}>
      <Routes>
        <Route path="/CountryDetails/:name" element={<CountryDetails />} />
      </Routes>
    </MemoryRouter>
  );

  // Espera a que aparezca el nombre común
  const nombreComun = await screen.findByText('País Raro');
  expect(nombreComun).toBeInTheDocument();
  // Los campos vacíos o faltantes deben mostrar '—'
  expect(screen.getAllByText('—').length).toBeGreaterThanOrEqual(6);

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        {
          name: { common: 'Colombia', official: 'República de Colombia', nativeName: { spa: { official: 'República de Colombia', common: 'Colombia' } } },
          flags: { svg: 'https://flagcdn.com/co.svg', alt: 'Bandera de Colombia' },
          population: 50000000,
          region: 'Americas',
          subregion: 'South America',
          capital: ['Bogotá'],
          currencies: { COP: { name: 'Colombian peso', symbol: '$' } },
          languages: { spa: 'Spanish' }
        }
      ])
    })
  );
});
afterEach(() => { jest.resetAllMocks(); });

test('muestra los detalles del país correctamente', async () => {
  render(
    <MemoryRouter initialEntries={["/CountryDetails/Colombia"]}>
      <Routes>
        <Route path="/CountryDetails/:name" element={<CountryDetails />} />
      </Routes>
    </MemoryRouter>
  );

  // Espera a que aparezca el nombre oficial
  const nombreOficial = await screen.findByText('República de Colombia');
  expect(nombreOficial).toBeInTheDocument();
  expect(screen.getByText('Colombia')).toBeInTheDocument();
  expect(screen.getByText('Bandera de Colombia')).toBeInTheDocument();
  expect(screen.getByText('Bogotá')).toBeInTheDocument();
  expect(screen.getByText('Americas')).toBeInTheDocument();
  expect(screen.getByText('South America')).toBeInTheDocument();
  expect(screen.getByText('Colombian peso ($) [COP]')).toBeInTheDocument();
  expect(screen.getByText('Spanish')).toBeInTheDocument();

  
});

test('muestra correctamente un país con datos incompletos o raros', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        {
          name: { common: 'País Raro', official: '', nativeName: undefined },
          flags: { svg: '', alt: '' },
          population: undefined,
          region: '',
          subregion: undefined,
          capital: [],
          currencies: undefined,
          languages: undefined
        }
      ])
    })
  );
});


