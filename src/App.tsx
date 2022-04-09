import React, {useEffect, useState} from 'react'
import AppRoutes from "./AppRoutes"
import './styles/simple-grid.scss'
import './App.scss'
import useAxios, {configure} from 'axios-hooks'
import Axios from 'axios'
import {CONFIG} from "./Settings";
import {UserContext, ViewMode} from "./models/Types";
import useLocalStorage from "./hooks/useLocalStorage";
import ReactModal from "react-modal";
import Api from "./resources/Api";

const axios = Axios.create({
  baseURL: CONFIG.api_url
})

configure({axios})

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('TABLE')
  const [userContext, setUserContext] = useLocalStorage<UserContext>("userContext");
  const [{data, loading}, execute] = useAxios<UserContext>("", {manual: true})

  useEffect(() => {
    ReactModal.setAppElement('#main');

    if (userContext) {
      let now = Date.now()
      console.log({expire: userContext.validUntilEpochMilli, now})

      if (now >= userContext.validUntilEpochMilli) {
        console.log("Token not valid anymore, refreshing")
        execute(Api.refresh(userContext.refreshToken))
      }
    }
  }, [])

  useEffect(() => {
    if (data && !loading) {
      setUserContext(data)
    }
  }, [data])

  return (
    <div id="main" className="App">
      <AppRoutes viewMode={viewMode} setViewMode={setViewMode} userContext={userContext} setUserContext={setUserContext} />
    </div>
  );
}

export default App;
