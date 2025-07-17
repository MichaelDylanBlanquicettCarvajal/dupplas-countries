import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Gallery from './Gallery';

export default function CountriesContainer() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleSelectRegion = (value) => {
    setRegion(value);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} onSelectRegion={handleSelectRegion} />
      <Gallery search={search} region={region} />
    </>
  );
}
