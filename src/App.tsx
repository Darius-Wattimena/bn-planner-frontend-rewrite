import React, {useEffect, useState} from 'react'
import AppRoutes from "./AppRoutes"
import './App.scss'
import useAxios, {configure} from 'axios-hooks'
import Axios from 'axios'
import {BACKEND_ENVIRONMENT, CONFIG} from "./Settings";
import {UserContext, ViewMode} from "./models/Types";
import ReactModal from "react-modal";
import Api from "./resources/Api";
import {useLocalStorage} from "usehooks-ts";

const axios = Axios.create({
  baseURL: CONFIG.api_url
})

configure({axios})

function App() {
  const [viewMode] = useState<ViewMode>('TABLE')
  const [localStorageUserContext, setLocalStorageUserContext] = useLocalStorage<UserContext | undefined>("userContext", undefined);
  const [userContext, setUserContext] = useState<UserContext | undefined>(localStorageUserContext);
  const [,execute] = useAxios<UserContext>("", {manual: true})

  useEffect(() => {
    ReactModal.setAppElement('#main');

    if (userContext) {
      let now = Date.now()
      if (BACKEND_ENVIRONMENT === "dev") {
        console.log({expire: userContext.validUntilEpochMilli, now})
      }

      if (now >= userContext.validUntilEpochMilli) {
        console.log("Token not valid anymore, refreshing")
        execute(Api.refresh(userContext.refreshToken))
        .then(result => setUserContext(result.data))
        .catch(_ => setUserContext(undefined))
      }
    }
  }, [])

  useEffect(() => {
    setLocalStorageUserContext(userContext)
  }, [userContext])

  return (
    <div id="main" className="App">
      <AppRoutes
        viewMode={viewMode}
        userContext={userContext}
        setUserContext={setUserContext}/>
    </div>
  );
}

export default App;
