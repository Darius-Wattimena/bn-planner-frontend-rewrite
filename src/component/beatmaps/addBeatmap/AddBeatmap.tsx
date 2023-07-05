import React, {useState} from "react";
import {ImCross, ImPlus} from "react-icons/im";
import useAxios from "axios-hooks";
import {Beatmap, Gamemode} from "../../../models/Types";
import Api from "../../../resources/Api";
import {ReactComponent as OsuLogo} from "../../../assets/osu.svg";
import {ReactComponent as TaikoLogo} from "../../../assets/taiko.svg";
import {ReactComponent as CatchLogo} from "../../../assets/catch.svg";
import {ReactComponent as ManiaLogo} from "../../../assets/mania.svg";
import {cloneDeep} from "lodash";

const beatmapUrlRegex = /https:\/\/(?:old|osu)(?:\.ppy\.sh\/s|\.ppy\.sh\/beatmapsets)\/(?<id>[0-9]+)/

interface AddBeatmapProps {
  setOpenAddBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

function AddBeatmap({setOpenAddBeatmap, setOpenBeatmapId}: AddBeatmapProps) {
  const [incorrectUrl, setIncorrectUrl] = useState(false)
  const [value, setValue] = useState("")
  const [gamemodes, setGamemodes] = useState<Gamemode[]>([])
  const [, execute] = useAxios<Beatmap>("", {manual: true})

  function onAddBeatmap() {
    let result = validateUrl()
    if (result) {
      execute(Api.addBeatmap(result, gamemodes)).then(() => {
        setIncorrectUrl(false)
        setOpenAddBeatmap(false)
        setOpenBeatmapId(Number(result))
      })
    } else {
      setIncorrectUrl(true)
    }
  }

  function validateUrl(): string | undefined {
    const match = value.match(beatmapUrlRegex)

    if (match !== null) {
      // @ts-ignore
      let result = match.groups.id

      if (result) {
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
              id={"add-beatmap"}
              value={value?.toString()}
              onChange={event => {
                setValue(event.target.value)
              }}
            />
          </div>
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
        </div>
      </div>
      <div className={"sub-container actions"}>
        <button onClick={() => {
          setOpenAddBeatmap(false)
        }} className={"button button-cancel button-text"}>
          <ImCross/> Close
        </button>
        <button onClick={() => {
          onAddBeatmap()
        }} className={"button button-submit button-text"}>
          <ImPlus/> Add Beatmap
        </button>
      </div>
    </div>
  )
}

export default AddBeatmap