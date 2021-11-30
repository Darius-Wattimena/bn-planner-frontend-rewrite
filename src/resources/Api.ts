import {BeatmapFilter} from "../models/Types";
import {AxiosRequestConfig} from "axios";

function filterToUrlParams<T>(filter: T) {
  let result = ''
  let first = true

  for (const item in filter) {
    if (Object.prototype.hasOwnProperty.call(filter, item)) {
      if (filter[item] === null) {
        continue
      }

      if (first) {
        result += '?' + item + '=' + filter[item]
        first = false
      } else {
        result += '&' + item + '=' + filter[item]
      }
    }
  }

  return result
}

const Api = {
  fetchBeatmapById: (beatmapId: number): AxiosRequestConfig => {
    return {
      method: 'GET',
      url: `/v2/beatmap/${beatmapId}`
    }
  },
  fetchCountBeatmapsByFilter: (filter: BeatmapFilter): AxiosRequestConfig => {
    return {
      method: 'GET',
      url: '/v2/beatmap/countBeatmaps' + filterToUrlParams(filter)
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
      url: '/v2/beatmap/findBeatmaps' + preparedUrlParams
    }
  },
}

export default Api
