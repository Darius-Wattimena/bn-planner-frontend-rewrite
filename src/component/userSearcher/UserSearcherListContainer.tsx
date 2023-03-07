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
  const [actualData, setActualData] = useState<User[]>()

  useEffect(() => {
    execute(Api.fetchUserSearchByFilter(queryFilter))
  }, [queryFilter])

  useEffect(() => {
    let shouldIncludeUser = false

    currentUser?.gamemodes.forEach((userGamemode) => {
      if ((queryFilter.gamemodes.length === 0 || queryFilter.gamemodes.includes(userGamemode.gamemode))
            && (queryFilter.roles.length === 0 || queryFilter.roles.includes(userGamemode.role))) {
        shouldIncludeUser = true
      }
    })

    if (shouldIncludeUser && currentUser) {
      // Add the user to the area of users, but make sure to remove the current user if already existing in the result
      let userIncludedData = cloneDeep(data)
        ?.filter(it => it.osuId !== currentUser.osuId)

      userIncludedData?.unshift(currentUser)

      setActualData(userIncludedData)
    } else {
      setActualData(data)
    }
  }, [data])

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