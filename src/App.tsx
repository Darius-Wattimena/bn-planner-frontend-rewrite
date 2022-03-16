import React, {useEffect, useState} from 'react'
import AppRoutes from "./AppRoutes"
import './styles/simple-grid.scss'
import './App.scss'
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

  useEffect(() => {
    if (userContext) {
      let now = Date.now()

      if (now >= userContext.validUntilEpochMilli) {
        // FIXME instead of removing the UserContext, refresh using the refresh token
        setUserContext(undefined)
      }
    }
  }, [setUserContext, userContext])

  return (
    <div className="App">
      <AppRoutes viewMode={viewMode} setViewMode={setViewMode} userContext={userContext} />
    </div>
  );
}

export default App;
