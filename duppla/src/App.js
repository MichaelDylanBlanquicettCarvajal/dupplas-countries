import './App.css';
import SearchBar from './Components/SearchBar';
import Content from './Components/Content';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar/>
        <Content/>
      </header>
    </div>
  );
}

export default App;
