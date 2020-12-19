import logo from './logo.svg';
import Articles from './components/Articles';
import Spinner from './components/Spinner';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Articles />
      </header>
    </div>
  );
}

export default App;
