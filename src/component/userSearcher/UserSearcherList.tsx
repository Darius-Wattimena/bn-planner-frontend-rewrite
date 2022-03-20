import React from "react";
import {NewUser} from "../../models/Types";
import {getProfilePictureUri, getUserRole} from "../../utils/UserUtils";

interface UserSearcherListProps {
    data: NewUser[] | undefined
    loading: boolean
}

function UserSearcherList({data, loading}: UserSearcherListProps) {
    return (
        <div className={"user-searcher-list"}>
            {data && data.map(item => {
                return (
                    <UserSearcherUser osuId={item.osuId} username={item.username} gamemodes={item.gamemodes} />
                )
            })}
        </div>
    )
}

function UserSearcherUser(user: NewUser) {
    const profilePictureUri = getProfilePictureUri(user.osuId)
    const roleDetails = getUserRole(user)

    return (
        <div className={"user-searcher-user"}>
            <div className={"user-searcher-user-picture-container"}>
                <div className={"user-searcher-user-picture"} style={{backgroundImage: `url(${profilePictureUri})`}} />
            </div>
            <div className={"user-searcher-user-info"}>
                <div className={"user-searcher-user-name"}>
                    {user.username}
                </div>
                <div className={`user-searcher-user-role ${roleDetails.className}`}>
                    {roleDetails.short}
                </div>
            </div>
            <div className={"user-searcher-user-groups"}>

            </div>
        </div>
    )
}

export default UserSearcherList