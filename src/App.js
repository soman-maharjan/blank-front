import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { useSelector } from 'react-redux';

function App() {
  return (
      <BrowserRouter>
        <div className="App font-mono">
          <Routes />
        </div>
      </BrowserRouter>
  );
}

export default App;
