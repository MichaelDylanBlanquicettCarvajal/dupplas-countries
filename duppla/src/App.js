import './App.css';
import CountriesContainer from './Components/CountriesContainer';
import CountryDetails from './Pages/CountryDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen bg-bogota bg-cover bg-center bg-fixed"
      >
        <Routes>
          <Route path="/" element={<CountriesContainer />} />
          <Route path="/CountryDetails/:name" element={<CountryDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
