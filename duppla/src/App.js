import './App.css';
import CountriesContainer from './Components/CountriesContainer';
import CountryDetails from './Pages/CountryDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div
        className="App min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/bogota.jpg')" }}
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
