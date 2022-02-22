import {BeatmapFilter, UserContext} from "../models/Types";
import {AxiosRequestConfig} from "axios";

function getAuthHeader() {
  const localStorageContext = localStorage.getItem('userContext')

  if (localStorageContext) {
    const userContext = JSON.parse(localStorageContext) as UserContext
    return { 'Authorization': 'Bearer ' + userContext.accessToken }
  } else {
    console.error("something went wrong when reading the UserContext from local storage")
  }
}

function filterToUrlParams<T>(filter: T) {
  let result = ''
  let first = true

  for (const item in filter) {
    if (Object.prototype.hasOwnProperty.call(filter, item)) {
      let value = filter[item]

      if (!value || (Array.isArray(value) && value.length === 0)) {
        continue
      }

      if (first) {
        result += '?' + item + '=' + value
        first = false
      } else {
        result += '&' + item + '=' + value
      }
    }
  }

  return result
}

const Api = {
  login: (token: string): AxiosRequestConfig<string> => {
    return {
      method: 'POST',
      url: '/v2/auth',
      data: token
    }
  },
  fetchBeatmapById: (beatmapId: number): AxiosRequestConfig => {
    return {
      method: 'GET',
      headers: getAuthHeader(),
      url: `/v2/beatmap/${beatmapId}`
    }
  },
  fetchCountBeatmapsByFilter: (filter: BeatmapFilter): AxiosRequestConfig => {
    return {
      method: 'GET',
      headers: getAuthHeader(),
      url: '/v2/beatmap/count' + filterToUrlParams(filter)
    }
  },
  fetchBeatmapsByFilter: (filter: BeatmapFilter, from: number, to: number): AxiosRequestConfig => {
    const urlParams = filterToUrlParams(filter)
    let preparedUrlParams

    if (urlParams === '') {
      preparedUrlParams = `?from=${from}&to=${to}`
    } else {
      preparedUrlParams = urlParams + `&from=${from}&to=${to}`
    }

    return {
      method: 'GET',
      headers: getAuthHeader(),
      url: '/v2/beatmap/find' + preparedUrlParams
    }
  },
}

export default Api
