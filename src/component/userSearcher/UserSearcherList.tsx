import React from "react";
import {NewUser} from "../../models/Types";

interface UserSearcherListProps {
    data: NewUser[] | undefined
    loading: boolean
}

function UserSearcherList({data, loading}: UserSearcherListProps) {
    return (
        <div className={"user-searcher-list"}>
            {data && data.map(item => {
                return (
                    <p>{item.username}</p>
                )
            })}
        </div>
    )
}

export default UserSearcherList