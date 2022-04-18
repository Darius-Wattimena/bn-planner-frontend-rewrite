import React, {useState} from "react";
import {ImCross, ImPlus} from "react-icons/im";
import useAxios from "axios-hooks";
import {Beatmap} from "../../../models/Types";
import Api from "../../../resources/Api";

const beatmapUrlRegex = /https:\/\/(?:old|osu)(?:\.ppy\.sh\/s|\.ppy\.sh\/beatmapsets)\/(?<id>[0-9]+)/

interface AddBeatmapProps {
  setOpenAddBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

function AddBeatmap({setOpenAddBeatmap, setOpenBeatmapId}: AddBeatmapProps) {
  const [incorrectUrl, setIncorrectUrl] = useState(false)
  const [value, setValue] = useState("")
  const [{}, execute] = useAxios<Beatmap>("", {manual: true})

  function onAddBeatmap() {
    let result = validateUrl()
    if (result) {
      execute(Api.addBeatmap(result)).then(() => {
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