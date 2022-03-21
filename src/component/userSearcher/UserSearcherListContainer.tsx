import UserSearcherList from "./UserSearcherList";
import {Beatmap, BeatmapGamemode, Gamemode, NewUser, User, UserSearchFilter} from "../../models/Types";
import useAxios from "axios-hooks";
import {useEffect} from "react";
import Api from "../../resources/Api";

interface UserSearcherListContainerProps {
  queryFilter: UserSearchFilter
  beatmapGamemodes: BeatmapGamemode[]
  changingGamemode: Gamemode | undefined
  changingUserId: string | undefined
  onSelectNominator: (replacingUserId: string, newNominatorId: string) => void
}

function UserSearcherListContainer({ queryFilter, beatmapGamemodes, changingGamemode, changingUserId, onSelectNominator }: UserSearcherListContainerProps) {
  const [{data, loading}, execute] = useAxios<NewUser[]>("", { manual: true })

  useEffect(() => {
    execute(Api.fetchUserSearchByFilter(queryFilter))
  }, [queryFilter])

  return (
    <UserSearcherList
      data={data}
      loading={loading}
      beatmapGamemodes={beatmapGamemodes}
      changingGamemode={changingGamemode}
      changingUserId={changingUserId}
      onSelectNominator={onSelectNominator}
    />
  )
}

export default UserSearcherListContainer