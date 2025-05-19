import React, {useState} from "react";
import useAxios from "axios-hooks";
import {Beatmap, Gamemode} from "../../../models/Types";
import Api from "../../../resources/Api";
import OsuLogo from "../../../assets/osu.svg?react";
import TaikoLogo from "../../../assets/taiko.svg?react";
import CatchLogo from "../../../assets/catch.svg?react";
import ManiaLogo from "../../../assets/mania.svg?react";
import {cloneDeep} from "lodash";
import {FaPlus, FaXmark} from "react-icons/fa6";

const beatmapUrlRegex = /https:\/\/(?:old|osu)(?:\.ppy\.sh\/s|\.ppy\.sh\/beatmapsets)\/(?<id>[0-9]+)/

interface AddBeatmapProps {
  setOpenAddBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  userGamemodes: Gamemode[]
}

function AddBeatmap({setOpenAddBeatmap, setOpenBeatmapId, userGamemodes}: AddBeatmapProps) {
  const [incorrectUrl, setIncorrectUrl] = useState(false)
  const [missingGamemodes, setMissingGamemodes] = useState(false)
  const [value, setValue] = useState("")
  const [gamemodes, setGamemodes] = useState<Gamemode[]>(userGamemodes)
  const [, execute] = useAxios<Beatmap>("", {manual: true})

  function onAddBeatmap() {
    let result = validateUrl()
    if (gamemodes.length === 0) {
      setMissingGamemodes(true)
      return
    }

    if (result) {
      execute(Api.addBeatmap(result, gamemodes)).then(() => {
        setOpenAddBeatmap(false)
        setOpenBeatmapId(Number(result))
      })
    }
  }

  function validateUrl(): string | undefined {
    const match = value.match(beatmapUrlRegex)

    if (match !== null) {
      // @ts-ignore
      let result = match.groups.id

      if (result) {
        setIncorrectUrl(false)
        return result
      }
    }

    setIncorrectUrl(true)
    return undefined
  }

  function toggleGamemode(gamemode: Gamemode) {
    let newGamemodes = cloneDeep(gamemodes)

    if (gamemodes.includes(gamemode)) {
      // Removal
      newGamemodes.splice(newGamemodes.indexOf(gamemode), 1)
    } else {
      // Addition
      newGamemodes.push(gamemode)
    }

    setGamemodes(newGamemodes)
  }

  return (
    <div className="modal-container">
      <div className={"sub-container"}>
        <div className={"sub-container-title"}>
          Add beatmap
        </div>
        <div className={"sub-container-content"}>
          <div className={"textbox"}>
            <label htmlFor={"add-beatmap"}>
              Beatmap URL
            </label>
            <input
              type={"text"}
              id={"add-beatmap"}
              value={value?.toString()}
              onChange={event => {
                setValue(event.target.value)
              }}
            />
          </div>
          {incorrectUrl &&
            <div className={"message-container"}>
              <div className={"message error-message"}>
                <div className={"header"}>The provided beatmap url is not correct</div>
                <div className={"content"}>
                  A beatmap url should either start with: 'https://osu.ppy.sh/beatmapsets/' or 'https://old.ppy.sh/s/' and then followed by the beatmap set id to be counted as a valid url
                </div>
              </div>
            </div>
          }
          <div className={"beatmap-gamemodes"}>
            Enabled Gamemodes
            <div className={"gamemodes"}>
              <div className={"gamemode" + (gamemodes.includes(Gamemode.Osu) ? " active" : "")}>
                <OsuLogo onClick={() => toggleGamemode(Gamemode.Osu)} />
              </div>
              <div className={"gamemode" + (gamemodes.includes(Gamemode.Taiko) ? " active" : "")}>
                <TaikoLogo onClick={() => toggleGamemode(Gamemode.Taiko)} />
              </div>
              <div className={"gamemode" + (gamemodes.includes(Gamemode.Catch) ? " active" : "")}>
                <CatchLogo onClick={() => toggleGamemode(Gamemode.Catch)} />
              </div>
              <div className={"gamemode" + (gamemodes.includes(Gamemode.Mania) ? " active" : "")}>
                <ManiaLogo onClick={() => toggleGamemode(Gamemode.Mania)} />
              </div>
            </div>
          </div>
          {missingGamemodes &&
            <div className={"message-container"}>
              <div className={"message error-message"}>
                <div className={"header"}>Missing gamemode</div>
                <div className={"content"}>
                  At least one gamemode must be selected when adding a beatmap
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <div className={"sub-container actions"}>
        <button onClick={() => {
          setOpenAddBeatmap(false)
        }} className={"button button-cancel button-text"}>
          <FaXmark /> Close
        </button>
        <button onClick={() => {
          onAddBeatmap()
        }} className={"button button-submit button-text"}>
          <FaPlus /> Add Beatmap
        </button>
      </div>
    </div>
  )
}

export default AddBeatmap