import './App.css';
import JsonSearch from './comp/json_search/json_search';
import Search from './comp/search/search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        robin search engine
      </header>
      <main>
        {/* <Search /> */}
        <JsonSearch />
      </main>
    </div>
  );
}

export default App;
