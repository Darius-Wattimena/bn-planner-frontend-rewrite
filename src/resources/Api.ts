import {
  BeatmapFilter,
  Gamemode,
  NewBeatmap,
  NewBeatmapStatus,
  PageLimit,
  UserContext,
  UserSearchFilter
} from "../models/Types";
import {AxiosRequestConfig} from "axios";

function getAuthToken() {
  const localStorageContext = localStorage.getItem('userContext')
  if (localStorageContext) {
    const userContext = JSON.parse(localStorageContext) as UserContext

    return userContext.accessToken
  } else {
    console.error("something went wrong when reading the UserContext from local storage")
  }
}

function getAuthHeader() {
  return {'Authorization': 'Bearer ' + getAuthToken()}
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
  refresh: (refreshToken: string): AxiosRequestConfig<string> => {
    return {
      method: 'POST',
      url: '/v2/auth/refresh',
      data: refreshToken
    }
  },
  addBeatmap: (beatmapId: string): AxiosRequestConfig<NewBeatmap> => {
    return {
      method: 'POST',
      headers: getAuthHeader(),
      url: `/v2/beatmap/add`,
      data: {
        osuId: beatmapId,
        gamemodes: [Gamemode.Catch]
      }
    }
  },
  deleteBeatmap: (beatmapId: number): AxiosRequestConfig<NewBeatmap> => {
    return {
      method: 'DELETE',
      headers: getAuthHeader(),
      url: `/v2/beatmap/${beatmapId}/delete`,
    }
  },
  updateBeatmapStatus: (beatmapId: number, newStatus: NewBeatmapStatus): AxiosRequestConfig => {
    return {
      method: 'PATCH',
      headers: getAuthHeader(),
      url: `/v2/beatmap/${beatmapId}/status?new=${newStatus}`,
    }
  },
  updateBeatmapNote: (beatmapId: number, newNote: string): AxiosRequestConfig<string> => {
    return {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + getAuthToken(),
        'Content-Type': 'text/plain'
      },
      url: `/v2/beatmap/${beatmapId}/note`,
      data: newNote
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
  fetchBeatmapsTableByFilter: (filter: BeatmapFilter, pageNumber: number, pageLimit: PageLimit): AxiosRequestConfig => {
    const urlParams = filterToUrlParams(filter)
    let preparedUrlParams

    if (urlParams === '') {
      preparedUrlParams = `?pageNumber=${pageNumber}&pageLimit=${pageLimit}`
    } else {
      preparedUrlParams = urlParams + `&pageNumber=${pageNumber}&pageLimit=${pageLimit}`
    }

    return {
      method: 'GET',
      headers: getAuthHeader(),
      url: '/v2/beatmap/find/table' + preparedUrlParams
    }
  },
  fetchUserSearchByFilter: (filter: UserSearchFilter): AxiosRequestConfig => {
    const urlParams = filterToUrlParams(filter)

    return {
      method: 'GET',
      headers: getAuthHeader(),
      url: '/v2/user/search' + urlParams
    }
  },
  updateNominator: (beatmapId: number, gamemode: Gamemode, replacingUserId: string, newNominatorId: string): AxiosRequestConfig => {
    return {
      method: 'PATCH',
      headers: getAuthHeader(),
      url: `/v2/beatmap/${beatmapId}/${gamemode}/nominator?old=${replacingUserId}&new=${newNominatorId}`
    }
  }
}

export default Api
