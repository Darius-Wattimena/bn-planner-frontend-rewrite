import React, {useState} from 'react'
import Routes from "./Routes"
import './styles/simple-grid.scss'
import './App.scss'
import { IconContext } from 'react-icons'
import { configure } from 'axios-hooks'
import Axios from 'axios'
import {CONFIG} from "./Settings";
import {ViewMode} from "./models/Types";

const axios = Axios.create({
  baseURL: CONFIG.api_url
})

configure({ axios })

function App() {
  const [viewMode, setViewMode] = useState(ViewMode.CARDS)

  return (
    <div className="App">
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <Routes viewMode={viewMode} />
      </IconContext.Provider>
    </div>
  );
}

export default App;
