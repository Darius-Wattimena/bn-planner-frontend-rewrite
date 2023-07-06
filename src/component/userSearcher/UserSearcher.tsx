import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import './UserSearcher.scss'
import {
  Beatmap,
  BeatmapFilter,
  BeatmapGamemode,
  Gamemode,
  SelectFilterItem,
  User,
  UserRole,
  UserSearchFilter
} from "../../models/Types";
import {USER_ROLES} from "../../Constants";
import {debouncingFilter, instantFilter} from "../../utils/FilterUtils";
import UserSearcherListContainer from "./UserSearcherListContainer";
import {ImSearch} from "react-icons/im";
import Api from "../../resources/Api";
import {cloneDeep} from "lodash";
import {AxiosPromise, AxiosRequestConfig} from "axios";
import {RefetchOptions} from "axios-hooks";
import UserSearcherHotbar from "./UserSearcherHotbar";

const filterDefaultState: UserSearchFilter = {
  username: null,
  gamemodes: [],
  roles: []
}

interface UserSearcherProps {
  currentUser?: User
  openUserSearcher: boolean
  setOpenUserSearcher: React.Dispatch<React.SetStateAction<boolean>>
  beatmapGamemodes?: BeatmapGamemode[]
  changingGamemode?: Gamemode | undefined
  changingUserId?: string | undefined
  beatmapId?: number
  beatmapFilter?: BeatmapFilter,
  setBeatmapFilter?: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  setBeatmapQueryFilter?: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  execute?: (config?: (AxiosRequestConfig | undefined), options?: (RefetchOptions | undefined)) => AxiosPromise<Beatmap>
}

function UserSearcher(
  {
    currentUser,
    openUserSearcher,
    setOpenUserSearcher,
    beatmapGamemodes,
    changingGamemode,
    changingUserId,
    beatmapId,
    beatmapFilter,
    setBeatmapFilter,
    setBeatmapQueryFilter,
    execute
  }: UserSearcherProps) {
  const [userSearchFilter, setUserSearchFilter] = useState<UserSearchFilter>(filterDefaultState)
  const [queryFilter, setQueryFilter] = useState<UserSearchFilter>(filterDefaultState)
  const [timeout, setTimeout] = useState<number>(0)

  function setupQueryFilterWithBeatmap() {
    let filter = cloneDeep(filterDefaultState)
    if (changingGamemode) {
      filter.gamemodes = [changingGamemode]
    } else if (beatmapFilter) {
      filter.gamemodes = beatmapFilter.gamemodes
    }

    return filter
  }

  useEffect(() => {
    if (openUserSearcher) {
      const startingQueryFilter = setupQueryFilterWithBeatmap()
      setUserSearchFilter(startingQueryFilter)
      setQueryFilter(startingQueryFilter)
    }
  }, [openUserSearcher, changingGamemode])

  function onSelectNominator(replacingUserId: string | undefined, newNominatorId: string | undefined) {
    if (changingGamemode && beatmapId && replacingUserId && newNominatorId && execute) {
      execute(Api.updateNominator(beatmapId, changingGamemode, replacingUserId, newNominatorId))
      setOpenUserSearcher(false)
    } else if (beatmapFilter && setBeatmapFilter && setBeatmapQueryFilter) {
      const selectedNominators = beatmapFilter["nominators"]
      let newSelectedNominators: (string | undefined)[];

      if (newNominatorId === undefined) {
        newSelectedNominators = selectedNominators.filter(it => it !== replacingUserId)
      } else {
        newSelectedNominators = selectedNominators
        newSelectedNominators.push(newNominatorId)
      }

      instantFilter(
        beatmapFilter,
        "nominators",
        newSelectedNominators,
        setBeatmapFilter,
        timeout,
        setBeatmapQueryFilter
      )
      setOpenUserSearcher(false)
    }
  }

  function updateUsernameFilter(newValue: string) {
    debouncingFilter(
      userSearchFilter,
      timeout,
      "username",
      newValue,
      setUserSearchFilter,
      setTimeout,
      setQueryFilter
    )
  }

  function onClose() {
    setOpenUserSearcher(false)
  }

  return (
    <Modal
      closeTimeoutMS={200}
      isOpen={openUserSearcher}
      onRequestClose={() => onClose()}
      contentLabel="User Searcher"
      className={"user-searcher-modal"}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      <div className={"user-searcher-content"}>
        <UserSearcherHotbar
          changingGamemode={changingGamemode}
          userSearchFilter={userSearchFilter}
          timeout={timeout}
          setUserSearchFilter={setUserSearchFilter}
          setQuerySearchFilter={setQueryFilter}
        />
        <div className={"user-searcher"}>
          <div className={"user-searcher-header"}>
            <h3>User Searcher</h3>
          </div>
          <div className={`user-searcher-textbox`}>
            <div className={"user-searcher-textbox-icon"}>
              <ImSearch/>
            </div>
            <input
              placeholder={"osu! Username"}
              value={userSearchFilter["username"]?.toString()}
              onChange={event => {
                updateUsernameFilter(event.target.value)
              }}
            />
          </div>
          <UserSearcherListContainer
            currentUser={currentUser}
            queryFilter={queryFilter}
            beatmapGamemodes={beatmapGamemodes}
            changingGamemode={changingGamemode}
            changingUserId={changingUserId}
            onSelectNominator={onSelectNominator}
            beatmapFilter={beatmapFilter}
          />
        </div>
      </div>
    </Modal>
  )
}

export default UserSearcher