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
  fetchInitialBeatmapsByFilter: (filter: BeatmapFilter): AxiosRequestConfig => {
    return {
      method: 'GET',
      url: '/v2/beatmap/findInitialBeatmaps' + filterToUrlParams(filter)
    }
  },
  fetchBeatmapsByFilter: (filter: BeatmapFilter, total: number, step: number): AxiosRequestConfig => {
    const urlParams = filterToUrlParams(filter)
    let preparedUrlParams

    console.log({urlParams})

    if (urlParams === '') {
      preparedUrlParams = `?step=${step}&total=${total}`
    } else {
      preparedUrlParams = urlParams + `&step=${step}&total=${total}`
    }

    return {
      method: 'GET',
      url: '/v2/beatmap/findBeatmaps' + preparedUrlParams
    }
  },
}

export default Api
