import './App.css';
import SearchBar from './Components/SearchBar';
import Gallery from './Components/Gallery';

function App() {
  return (
    <div className="App min-h-screen bg-cover bg-center bg-fixed">
      <header className="App-header">
        <SearchBar />
        <div className="min-h-screen bg-gray-100">
          <Gallery />
        </div>
      </header>
    </div>
  );
}

export default App;
