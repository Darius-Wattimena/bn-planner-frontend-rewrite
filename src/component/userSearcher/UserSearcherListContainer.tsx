import UserSearcherList from "./UserSearcherList";
import {Beatmap, NewUser, User, UserSearchFilter} from "../../models/Types";
import useAxios from "axios-hooks";
import {useEffect} from "react";
import Api from "../../resources/Api";

interface UserSearcherListContainerProps {
  queryFilter: UserSearchFilter
}

function UserSearcherListContainer({ queryFilter }: UserSearcherListContainerProps) {
  const [{data, loading}, execute] = useAxios<NewUser[]>("", { manual: true })

  useEffect(() => {
    execute(Api.fetchUserSearchByFilter(queryFilter))
  }, [queryFilter])

  return (
    <UserSearcherList data={data} loading={loading} />
  )
}

export default UserSearcherListContainer