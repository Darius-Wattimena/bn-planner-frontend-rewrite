import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import './UserSearcher.scss'
import {Gamemode, SelectFilterItem, UserRole, UserSearchFilter} from "../../models/Types";
import {USER_ROLES} from "../../Constants";
import {debouncingFilter, instantFilter} from "../../utils/FilterUtils";
import UserSearcherListContainer from "./UserSearcherListContainer";
import {ImSearch} from "react-icons/im";

const filterDefaultState: UserSearchFilter = {
  username: null,
  gamemodes: [],
  roles: []
}

interface UserSearcherProps {
  openUserSearcher: boolean
  setOpenUserSearcher: React.Dispatch<React.SetStateAction<boolean>>
}

function UserSearcher({openUserSearcher, setOpenUserSearcher}: UserSearcherProps) {

  const [userSearchFilter, setUserSearchFilter] = useState<UserSearchFilter>(filterDefaultState)
  const [queryFilter, setQueryFilter] = useState<UserSearchFilter>(filterDefaultState)
  const [timeout, setTimeout] = useState<number>(0)
  const [filterGamemodes, setFilterGamemodes] = useState<SelectFilterItem[]>([])
  const [filterRoles, setFilterRoles] = useState<SelectFilterItem[]>([])
  const [selectedGamemodes, setSelectedGamemodes] = useState<Gamemode[]>(userSearchFilter.gamemodes)
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>(userSearchFilter.roles)

  useEffect(() => {
    let osuGamemode = selectedGamemodes.find(item => item === "osu")
    let taikoGamemode = selectedGamemodes.find(item => item === "taiko")
    let catchGamemode = selectedGamemodes.find(item => item === "fruits")
    let maniaGamemode = selectedGamemodes.find(item => item === "mania")

    setFilterGamemodes([
      {index: 0, label: "Osu", value: "osu", selected: osuGamemode != null || osuGamemode !== undefined},
      {index: 1, label: "Taiko", value: "taiko", selected: taikoGamemode != null || taikoGamemode !== undefined},
      {index: 2, label: "Catch", value: "fruits", selected: catchGamemode != null || catchGamemode !== undefined},
      {index: 3, label: "Mania", value: "mania", selected: maniaGamemode != null || maniaGamemode !== undefined}
    ])

    let nominatorRole = selectedRoles.find(item => item === "Nominator")
    let probationRole = selectedRoles.find(item => item === "Probation")
    let natRole = selectedRoles.find(item => item === "NominationAssessment")

    setFilterRoles([
      {index: 0, label: USER_ROLES.Nominator.short, value: "Nominator", selected: nominatorRole != null || nominatorRole !== undefined},
      {index: 1, label: USER_ROLES.Probation.short, value: "Probation", selected: probationRole != null || probationRole !== undefined},
      {index: 2, label: USER_ROLES.NAT.short, value: "NominationAssessment", selected: natRole != null || natRole !== undefined}
    ])
  }, [userSearchFilter, selectedGamemodes, selectedRoles])

  function remove<T>(value: T, array: T[]){
    array.forEach( (item, index) => {
      if(item === value) {
        array.splice(index,1);
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

  const usernameValue = userSearchFilter["username"]

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

  return (
    <Modal
      closeTimeoutMS={200}
      isOpen={openUserSearcher}
      onRequestClose={() => setOpenUserSearcher(false)}
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
              <div className={`user-searcher-select-item ${index !== 0 ? "user-searcher-select-item-not-first" : ""}`} key={index}>
                <input
                  type="checkbox"
                  id={`${selectItem.index}-gamemode`}
                  checked={selectItem.selected}
                  onChange={event => {
                    updateSelectedGamemodes(selectItem.value, event.target.checked)
                  }}
                />
                <label className={"todo"} htmlFor={`${selectItem.index}-status`}>
                  {selectItem.label}
                </label>
              </div>
            )
          })}
          <h4 className={"user-searcher-header"}>Roles</h4>
          {filterRoles.map((selectItem, index) => {
            return (
              <div className={`user-searcher-select-item ${index !== 0 ? "user-searcher-select-item-not-first" : ""}`} key={index}>
                <input
                  type="checkbox"
                  id={`${selectItem.index}-status`}
                  checked={selectItem.selected}
                  onChange={event => {
                    updateSelectedRoles(selectItem.value, event.target.checked)
                  }}
                />
                <label className={"todo"} htmlFor={`${selectItem.index}-status`}>
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
              <ImSearch />
            </div>
            <input
              placeholder={"osu! Username"}
              value={usernameValue?.toString()}
              onChange={event => {
                updateUsernameFilter(event.target.value)
              }}
            />
          </div>
          <UserSearcherListContainer />
        </div>
      </div>
    </Modal>
  )
}

export default UserSearcher