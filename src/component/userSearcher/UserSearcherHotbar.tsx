import {Gamemode, SelectFilterItem, UserRole, UserSearchFilter} from "../../models/Types";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {USER_ROLES} from "../../Constants";
import {instantFilter} from "../../utils/FilterUtils";

interface UserSearcherHotbarProps {
  changingGamemode: Gamemode | undefined
  userSearchFilter: UserSearchFilter
  timeout: number
  setUserSearchFilter: Dispatch<SetStateAction<UserSearchFilter>>
  setQuerySearchFilter: Dispatch<SetStateAction<UserSearchFilter>>
}

function UserSearcherHotbar(
  {
    changingGamemode,
    userSearchFilter,
    timeout,
    setUserSearchFilter,
    setQuerySearchFilter
  }: UserSearcherHotbarProps) {
  const [filterGamemodes, setFilterGamemodes] = useState<SelectFilterItem[]>([])
  const [filterRoles, setFilterRoles] = useState<SelectFilterItem[]>([])

  useEffect(() => {
    if (changingGamemode) {
      let initialFilter = getInitialGamemodeFilter(changingGamemode)
      setFilterGamemodes(initialFilter)
    }

  }, [changingGamemode])

  useEffect(() => {
    let changedFilterGamemodes = getUpdatedGamemodeFilter(userSearchFilter["gamemodes"])

    if (changedFilterGamemodes !== filterGamemodes) {
      setFilterGamemodes(changedFilterGamemodes)
    }

    let changedFilterRoles = getUpdatedRoleFilter(userSearchFilter["roles"])

    if (changedFilterRoles !== filterRoles) {
      setFilterRoles(changedFilterRoles)
    }
  }, [userSearchFilter])

  function updateSelectedGamemodes(value: Gamemode, checked: boolean) {
    const selectedField = userSearchFilter["gamemodes"]
    const newGamemodes: Gamemode[] = [];

    selectedField?.forEach(val => newGamemodes.push(val))

    if (checked) {
      newGamemodes.push(value)
    } else {
      remove(value, newGamemodes)
    }

    instantFilter(
      userSearchFilter,
      "gamemodes",
      newGamemodes,
      setUserSearchFilter,
      timeout,
      setQuerySearchFilter
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

    instantFilter(
      userSearchFilter,
      "roles",
      newRoles,
      setUserSearchFilter,
      timeout,
      setQuerySearchFilter
    )
  }

  function getUpdatedRoleFilter(newRoles: UserRole[]): SelectFilterItem[] {
    let nominatorRole = newRoles.find(item => item === "Nominator")
    let probationRole = newRoles.find(item => item === "Probation")
    let natRole = newRoles.find(item => item === "NominationAssessment")

    return [
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
    ]
  }

  function getUpdatedGamemodeFilter(newGamemodes: Gamemode[]): SelectFilterItem[] {
    let osuGamemode = newGamemodes.find(item => item === Gamemode.Osu)
    let taikoGamemode = newGamemodes.find(item => item === Gamemode.Taiko)
    let catchGamemode = newGamemodes.find(item => item === Gamemode.Catch)
    let maniaGamemode = newGamemodes.find(item => item === Gamemode.Mania)

    return [
      {
        index: 0,
        label: "Osu",
        value: "osu",
        selected: osuGamemode !== undefined,
        disabled: changingGamemode && changingGamemode !== Gamemode.Osu
      },
      {
        index: 1,
        label: "Taiko",
        value: "taiko",
        selected: taikoGamemode !== undefined,
        disabled: changingGamemode && changingGamemode !== Gamemode.Taiko
      },
      {
        index: 2,
        label: "Catch",
        value: "fruits",
        selected: catchGamemode !== undefined,
        disabled: changingGamemode && changingGamemode !== Gamemode.Catch
      },
      {
        index: 3,
        label: "Mania",
        value: "mania",
        selected: maniaGamemode !== undefined,
        disabled: changingGamemode && changingGamemode !== Gamemode.Mania
      }
    ]
  }

  function getInitialGamemodeFilter(gamemode: Gamemode | undefined): SelectFilterItem[] {
    return [
      {
        index: 0,
        label: "Osu",
        value: "osu",
        selected: gamemode === Gamemode.Osu,
        disabled: gamemode && gamemode !== Gamemode.Osu
      },
      {
        index: 1,
        label: "Taiko",
        value: "taiko",
        selected: gamemode === Gamemode.Taiko,
        disabled: gamemode && gamemode !== Gamemode.Taiko
      },
      {
        index: 2,
        label: "Catch",
        value: "fruits",
        selected: gamemode === Gamemode.Catch,
        disabled: gamemode && gamemode !== Gamemode.Catch
      },
      {
        index: 3,
        label: "Mania",
        value: "mania",
        selected: gamemode === Gamemode.Mania,
        disabled: gamemode && gamemode !== Gamemode.Mania
      }
    ]
  }

  function remove<T>(value: T, array: T[]) {
    array.forEach((item, index) => {
      if (item === value) {
        array.splice(index, 1);
        return
      }
    });
  }

  return (
    <div className={"user-searcher-hotbar"}>
      <h4 className={"user-searcher-header"}>Gamemodes</h4>
      <div className={"user-searcher-hotbar-container"}>
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
      </div>
      <h4 className={"user-searcher-header"}>Roles</h4>
      <div className={"user-searcher-hotbar-container"}>
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
    </div>
  )
}

export default UserSearcherHotbar