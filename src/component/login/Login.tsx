import React, {useEffect, useState} from "react";
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import {Navigate, useLocation} from 'react-router-dom';
import {UserContext} from "../../models/Types";
import "./Login.scss"
import PageHeader from "../generic/PageHeader";
import {FaRightToBracket, FaSpinner} from "react-icons/fa6";

interface LoginProps {
  userContext: UserContext | undefined
  setUserContext: React.Dispatch<React.SetStateAction<UserContext | undefined>>
}

function Login({userContext, setUserContext}: LoginProps) {
  const [{data, loading, error}, execute] = useAxios<UserContext>("", {manual: true})
  const [redirectToHome, setRedirectToHome] = useState(false)
  const location = useLocation()

  let urlParams = new URLSearchParams(location.search)
  const code = urlParams.get('code')
  // TODO add support to handle state so we can redirect to the previous page the user was on
  // const state = urlParams.get('state')

  useEffect(() => {
    if (code !== null && code !== "") {
      execute(Api.login(code))
        .then(onResult => setUserContext(onResult.data))
        .catch(reason => {
          console.log({reason})
          setRedirectToHome(true)
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

  if (redirectToHome || (userContext?.accessToken && userContext?.accessToken !== "")) {
    return <Navigate to={"/"} state={true} />
  } else {
    return (
      <>
        <PageHeader title={"Login"} icon={<FaRightToBracket />} />
        <div className={"landing-page"}>
          <div className={"login-screen"}>
            <FaSpinner className={"login-icon icon-spin"} />
            <h3>Logging in</h3>
            <p>Please wait while we validate your osu! token.</p>
          </div>
        </div>
        <div className={"footer"} />
      </>
    )
  }
}

export default Login