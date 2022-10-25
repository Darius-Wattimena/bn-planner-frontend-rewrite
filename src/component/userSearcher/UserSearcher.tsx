import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import './UserSearcher.scss'
import {
  Beatmap,
  BeatmapFilter,
  BeatmapGamemode,
  Gamemode,
  SelectFilterItem,
  UserRole,
  UserSearchFilter
} from "../../models/Types";
import {USER_ROLES} from "../../Constants";
import {debouncingFilter, instantFilter} from "../../utils/FilterUtils";
import UserSearcherListContainer from "./UserSearcherListContainer";
import {ImSearch} from "react-icons/im";
import useAxios from "axios-hooks";
import Api from "../../resources/Api";

const filterDefaultState: UserSearchFilter = {
  username: null,
  gamemodes: [],
  roles: []
}

interface UserSearcherProps {
  openUserSearcher: boolean
  setOpenUserSearcher: React.Dispatch<React.SetStateAction<boolean>>
  setBeatmap?: React.Dispatch<React.SetStateAction<Beatmap | undefined>>
  beatmapGamemodes?: BeatmapGamemode[]
  changingGamemode?: Gamemode | undefined
  changingUserId?: string | undefined
  beatmapId?: number
  beatmapFilter?: BeatmapFilter,
  setBeatmapFilter?: React.Dispatch<React.SetStateAction<BeatmapFilter>>
  setBeatmapQueryFilter?: React.Dispatch<React.SetStateAction<BeatmapFilter>>
}

function UserSearcher(
  {
    openUserSearcher,
    setOpenUserSearcher,
    setBeatmap,
    beatmapGamemodes,
    changingGamemode,
    changingUserId,
    beatmapId,
    beatmapFilter,
    setBeatmapFilter,
    setBeatmapQueryFilter
  }: UserSearcherProps) {
  const [userSearchFilter, setUserSearchFilter] = useState<UserSearchFilter>(filterDefaultState)
  const [queryFilter, setQueryFilter] = useState<UserSearchFilter>(filterDefaultState)
  const [timeout, setTimeout] = useState<number>(0)
  const [filterGamemodes, setFilterGamemodes] = useState<SelectFilterItem[]>([])
  const [filterRoles, setFilterRoles] = useState<SelectFilterItem[]>([])
  const [selectedGamemodes, setSelectedGamemodes] = useState<Gamemode[]>(userSearchFilter.gamemodes)
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>(userSearchFilter.roles)
  const [{data}, execute] = useAxios<Beatmap>("", {manual: true})

  useEffect(() => {
    if (openUserSearcher) {
      onOpen()
    }

  }, [openUserSearcher])

  useEffect(() => {
    onUpdateFilters()
  }, [userSearchFilter, selectedGamemodes, selectedRoles])

  function onSelectNominator(replacingUserId: string | undefined, newNominatorId: string | undefined) {
    if (changingGamemode && beatmapId && replacingUserId && newNominatorId) {
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

      console.log({newSelectedNominators, selectedNominators, replacingUserId, beatmapId})

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

  useEffect(() => {
    if (data && setBeatmap) {
      setBeatmap(data)
    }
  }, [data])

  function remove<T>(value: T, array: T[]) {
    array.forEach((item, index) => {
      if (item === value) {
        array.splice(index, 1);
        return
      }
    });
  }

  function updateSelectedGamemodes(value: Gamemode, checked: boolean) {
    const selectedField = userSearchFilter["gamemodes"]
    const newGamemodes: Gamemode[] = [];

    selectedField?.forEach(val => newGamemodes.push(val))

    if (checked) {
      newGamemodes.push(value)
    } else {
      remove(value, newGamemodes)
    }

    setSelectedGamemodes(newGamemodes)

    instantFilter(
      userSearchFilter,
      "gamemodes",
      newGamemodes,
      setUserSearchFilter,
      timeout,
      setQueryFilter
    )
  }

  function updateSelectedRoles(value: UserRole, checked: boolean) {
    const selectedField = userSearchFilter["roles"]
    const newRoles: UserRole[] = [];

    selectedField?.forEach(val => newRoles.push(val))

    if (checked) {
      newRoles.push(value)
    } else {
      remove(value, newRoles)
    }

    setSelectedRoles(newRoles)

    instantFilter(
      userSearchFilter,
      "roles",
      newRoles,
      setUserSearchFilter,
      timeout,
      setQueryFilter
    )
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

  function onUpdateFilters() {
    let osuGamemode = selectedGamemodes.find(item => item === Gamemode.Osu)
    let taikoGamemode = selectedGamemodes.find(item => item === Gamemode.Taiko)
    let catchGamemode = selectedGamemodes.find(item => item === Gamemode.Catch)
    let maniaGamemode = selectedGamemodes.find(item => item === Gamemode.Mania)

    setFilterGamemodes([
      {
        index: 0,
        label: "Osu",
        value: "osu",
        selected: osuGamemode != null || osuGamemode !== undefined,
        disabled: beatmapGamemodes ? !beatmapGamemodes.find(it => it.gamemode === Gamemode.Osu) : false
      },
      {
        index: 1,
        label: "Taiko",
        value: "taiko",
        selected: taikoGamemode != null || taikoGamemode !== undefined,
        disabled: beatmapGamemodes ? !beatmapGamemodes.find(it => it.gamemode === Gamemode.Taiko) : false
      },
      {
        index: 2,
        label: "Catch",
        value: "fruits",
        selected: catchGamemode != null || catchGamemode !== undefined,
        disabled: beatmapGamemodes ? !beatmapGamemodes.find(it => it.gamemode === Gamemode.Catch) : false
      },
      {
        index: 3,
        label: "Mania",
        value: "mania",
        selected: maniaGamemode != null || maniaGamemode !== undefined,
        disabled: beatmapGamemodes ? !beatmapGamemodes.find(it => it.gamemode === Gamemode.Mania) : false
      }
    ])

    let nominatorRole = selectedRoles.find(item => item === "Nominator")
    let probationRole = selectedRoles.find(item => item === "Probation")
    let natRole = selectedRoles.find(item => item === "NominationAssessment")

    setFilterRoles([
      {
        index: 0,
        label: USER_ROLES.Nominator.short,
        value: "Nominator",
        selected: nominatorRole != null || nominatorRole !== undefined
      },
      {
        index: 1,
        label: USER_ROLES.Probation.short,
        value: "Probation",
        selected: probationRole != null || probationRole !== undefined
      },
      {
        index: 2,
        label: USER_ROLES.NAT.short,
        value: "NominationAssessment",
        selected: natRole != null || natRole !== undefined
      }
    ])
  }

  function onOpen() {
    if (changingGamemode !== undefined) {
      setUserSearchFilter({
        username: null,
        gamemodes: [changingGamemode],
        roles: []
      })
    } else if (beatmapFilter !== undefined) {
      setUserSearchFilter({
        username: null,
        gamemodes: beatmapFilter.gamemodes,
        roles: []
      })
    }

    onUpdateFilters()
    setOpenUserSearcher(true)
  }

  function onClose() {
    setUserSearchFilter(filterDefaultState)
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
        <div className={"user-searcher-hotbar"}>
          <h4 className={"user-searcher-header"}>Gamemodes</h4>
          {filterGamemodes.map((selectItem, index) => {
            return (
              <div key={index}
                   className={`user-searcher-select-item ${selectItem.disabled ? "disabled" : ""} ${index !== 0 ? "user-searcher-select-item-not-first" : ""}`}>
                <input
                  type="checkbox"
                  id={`${selectItem.index}-usersearcher-gamemode`}
                  checked={selectItem.selected}
                  disabled={selectItem.disabled}
                  onChange={event => {
                    updateSelectedGamemodes(selectItem.value, event.target.checked)
                  }}
                />
                <label className={"todo"} htmlFor={`${selectItem.index}-usersearcher-gamemode`}>
                  {selectItem.label}
                </label>
              </div>
            )
          })}
          <h4 className={"user-searcher-header"}>Roles</h4>
          {filterRoles.map((selectItem, index) => {
            return (
              <div key={index}
                   className={`user-searcher-select-item ${index !== 0 ? "user-searcher-select-item-not-first" : ""}`}>
                <input
                  type="checkbox"
                  id={`${selectItem.index}-roles`}
                  checked={selectItem.selected}
                  onChange={event => {
                    updateSelectedRoles(selectItem.value, event.target.checked)
                  }}
                />
                <label className={"todo"} htmlFor={`${selectItem.index}-roles`}>
                  {selectItem.label}
                </label>
              </div>
            )
          })}
        </div>
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