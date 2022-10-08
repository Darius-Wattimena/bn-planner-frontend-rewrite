import React, {useState} from "react";
import {ImCheckmark, ImCross} from "react-icons/im";
import useAxios from "axios-hooks";
import Api from "../../../resources/Api";
import {Beatmap} from "../../../models/Types";

interface NoteChangeBeatmapProps {
  beatmap: Beatmap
  setBeatmap: React.Dispatch<React.SetStateAction<Beatmap | undefined>>
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setRefreshOnClose: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NoteChangeBeatmap({beatmap, setBeatmap, setIsModalOpen, setRefreshOnClose}: NoteChangeBeatmapProps) {
  const [newNote, setNewNote] = useState<string>(beatmap.note)
  const [{}, execute] = useAxios<boolean>("", {manual: true})

  function onChangeBeatmapStatus() {
    execute(Api.updateBeatmapNote(beatmap.osuId, newNote)).then(() => {
      let newLocalBeatmap = beatmap
      newLocalBeatmap.note = newNote
      setIsModalOpen(false)
      setBeatmap(newLocalBeatmap)
      setRefreshOnClose(true)
    })
  }

  return (
    <div className="modal-container">
      <div className={"sub-container"}>
        <div className={"sub-container-title"}>
          Editing beatmap note
        </div>
        <div className={"sub-container-content"}>
          <div className={"textbox"}>
            <label htmlFor={"note-change-beatmap"}>
              Beatmap Note
            </label>
            <input
              id={"note-change-beatmap"}
              value={newNote?.toString()}
              onChange={event => {
                setNewNote(event.target.value)
              }}
            />
          </div>
        </div>
      </div>
      <div className={"sub-container actions"}>
        <button onClick={() => {
          setIsModalOpen(false)
        }} className={"button button-cancel button-text"}>
          <ImCross/> Cancel
        </button>
        <button onClick={() => {
          onChangeBeatmapStatus()
        }} className={"button button-submit button-text"}>
          <ImCheckmark/> Submit
        </button>
      </div>
    </div>
  )
}
