import React, {useEffect} from "react";
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import useLocalStorage from "../../hooks/useLocalStorage";
import {Navigate, useLocation} from 'react-router-dom';
import {UserContext} from "../../models/Types";

function Login() {
  const [{data, loading, error}, execute] = useAxios<UserContext>("", {manual: true})
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
      if (data) {
        setUserContext(data)
      }
    }
  }, [data, loading, error, setUserContext])

  if (userContext?.accessToken && userContext?.accessToken !== "") {
    return <Navigate to={"/"}/>
  } else {
    return (
      <div>
        TODO : LOGIN OVERLAY/PAGE?
      </div>
    )
  }
}

export default Login