import UserSearcherList from "./UserSearcherList";
import {BeatmapFilter, BeatmapGamemode, Gamemode, User, UserSearchFilter} from "../../models/Types";
import useAxios from "axios-hooks";
import {useEffect, useState} from "react";
import Api from "../../resources/Api";
import {cloneDeep} from "lodash";

interface UserSearcherListContainerProps {
  currentUser?: User
  queryFilter: UserSearchFilter
  beatmapGamemodes?: BeatmapGamemode[]
  changingGamemode: Gamemode | undefined
  changingUserId: string | undefined
  onSelectNominator: (replacingUserId: string | undefined, newNominatorId: string | undefined) => void
  beatmapFilter?: BeatmapFilter
}

function UserSearcherListContainer(
  {
    currentUser,
    queryFilter,
    beatmapGamemodes,
    changingGamemode,
    changingUserId,
    onSelectNominator,
    beatmapFilter
  }: UserSearcherListContainerProps) {
  const [{data, loading}, execute] = useAxios<User[]>("", {manual: true})
  const [actualData, setActualData] = useState<User[]>([])

  useEffect(() => {
    execute(Api.fetchUserSearchByFilter(queryFilter))
  }, [queryFilter])

  useEffect(() => {
    updateList()
  }, [data])

  function updateList() {
    if (!data) {
      return
    }

    if (!currentUser) {
      setActualData(data)
      return
    }

    let shouldIncludeUser = false

    currentUser.gamemodes.forEach((userGamemode) => {
      if ((queryFilter.gamemodes.length === 0 || queryFilter.gamemodes.includes(userGamemode.gamemode))
        && (queryFilter.roles.length === 0 || queryFilter.roles.includes(userGamemode.role))) {
        shouldIncludeUser = true
      }
    })

    if (shouldIncludeUser) {
      // Add the user to the area of users, but make sure to remove the current user if already existing in the result
      let copiedData = (data) ? cloneDeep(data) : []
      let newData = copiedData.filter(it => it.osuId !== currentUser.osuId)
      newData.unshift(currentUser)

      setActualData(newData)
    } else {
      setActualData(data)
    }
  }

  return (
    <UserSearcherList
      data={actualData}
      loading={loading}
      beatmapGamemodes={beatmapGamemodes}
      changingGamemode={changingGamemode}
      changingUserId={changingUserId}
      onSelectNominator={onSelectNominator}
      beatmapFilter={beatmapFilter}
    />
  )
}

export default UserSearcherListContainer