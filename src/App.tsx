import React, {useState} from 'react'
import Routes from "./Routes"
import './styles/simple-grid.scss'
import './App.scss'
import { IconContext } from 'react-icons'
import { configure } from 'axios-hooks'
import Axios from 'axios'
import {CONFIG} from "./Settings";
import {UserContext, ViewMode} from "./models/Types";
import useLocalStorage from "./hooks/useLocalStorage";

const axios = Axios.create({
  baseURL: CONFIG.api_url
})

configure({ axios })

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('CARDS')
  const [userContext, setUserContext] = useLocalStorage<UserContext>("userContext");

  if (userContext) {
    let now = Date.now()

    console.log({
      now, until: userContext.validUntilEpochMilli
    })

    if (now >= userContext.validUntilEpochMilli) {
      setUserContext(undefined)
    }
  }

  return (
    <div className="App">
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <Routes viewMode={viewMode} userContext={userContext} />
      </IconContext.Provider>
    </div>
  );
}

export default App;
