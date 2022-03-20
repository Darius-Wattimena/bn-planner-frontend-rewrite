import React from "react";
import {BeatmapGamemode, NewUser, UserSearchFilter} from "../../models/Types";
import {getProfilePictureUri, getUserRole} from "../../utils/UserUtils";

interface UserSearcherListProps {
    data: NewUser[] | undefined
    loading: boolean
    beatmapGamemodes: BeatmapGamemode[]
}

function UserSearcherList({ data, loading, beatmapGamemodes}: UserSearcherListProps) {
    return (
        <div className={"user-searcher-list"}>
            {data && data.map(item => {
                return (
                    <UserSearcherUser
                        user={item}
                        alreadyNominator={!beatmapGamemodes.find(gamemode =>
                            !gamemode.nominators.find(nominator => nominator.nominator.osuId === item.osuId)
                        )}
                    />
                )
            })}
        </div>
    )
}

interface UserSearcherUserProps {
    user: NewUser
    alreadyNominator: boolean
}

function UserSearcherUser({ user, alreadyNominator }: UserSearcherUserProps) {
    const profilePictureUri = getProfilePictureUri(user.osuId)
    const roleDetails = getUserRole(user)

    return (
        <div className={`user-searcher-user ${alreadyNominator ? "already-nominator" : ""}`}>
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