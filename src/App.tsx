import React from 'react';
import Routes from "./Routes";
import './styles/simple-grid.scss'
import './App.scss'
import { IconContext } from 'react-icons';

function App() {
  return (
    <div className="App">
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <Routes />
      </IconContext.Provider>
    </div>
  );
}

export default App;
