import React, {useEffect} from "react";
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import {Navigate, useLocation} from 'react-router-dom';
import {UserContext} from "../../models/Types";

interface LoginProps {
  userContext: UserContext | undefined
  setUserContext: React.Dispatch<React.SetStateAction<UserContext | undefined>>
}

function Login({userContext, setUserContext}: LoginProps) {
  const [{data, loading, error}, execute] = useAxios<UserContext>("", {manual: true})
  const location = useLocation()

  let urlParams = new URLSearchParams(location.search)
  const code = urlParams.get('code')
  // TODO add support to handle state so we can redirect to the previous page the user was on
  // const state = urlParams.get('state')

  useEffect(() => {
    if (code !== null && code !== "") {
      execute(Api.login(code)).then(onResult => {
        setUserContext(onResult.data)

        // Logging in went wrong, redirect to home
        if (onResult.data !== null && onResult.data !== undefined) {
          return <Navigate to={"/"} />
        }
      })
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
      <div className={"landing-page"}>
        <div className={"welcome-screen"}>
          Logging in
        </div>
      </div>
    )
  }
}

export default Login