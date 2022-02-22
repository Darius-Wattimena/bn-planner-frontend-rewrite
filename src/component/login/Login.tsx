import React, {useEffect} from "react";
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import useLocalStorage from "../../hooks/useLocalStorage";
import {Navigate, useLocation} from 'react-router-dom';
import {UserContext} from "../../models/Types";

interface LoginLocation {
  code: string
}

function Login() {
  const [{data, loading, error}, execute] = useAxios<UserContext>(Api.login(""), { manual: true })
  const [userContext, setUserContext] = useLocalStorage<UserContext>("userContext");
  const location = useLocation()

  let urlParams = new URLSearchParams(location.search)
  const code = urlParams.get('code')
  // TODO add support to handle state so we can redirect to the previous page the user was on
  // const state = urlParams.get('state')

  useEffect(() => {
    if (code !== null && code !== "") {
      execute(Api.login(code))
    }
  }, [execute, code])

  useEffect(() => {
    if (error) {
      // TODO replace with error popup?
      console.error(error)
    } else if (!loading) {
      console.log("Finished receiving token from backend")
      console.log({ data })

      if (data) {
        setUserContext(data)
      }
    } else {
      console.log("Token request is still being processed")
    }
  }, [data, loading, error, setUserContext])

  if (userContext?.accessToken && userContext?.accessToken !== "") {
    return <Navigate to={"/"} />
  } else {
    return <div />
  }
}

export default Login