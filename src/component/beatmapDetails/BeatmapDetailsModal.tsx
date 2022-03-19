import {Beatmap} from "../../models/Types";
import Modal from "react-modal";
import {ImBin2, ImCross} from "react-icons/im";
import {FaStickyNote} from "react-icons/fa";
import React, {useState} from "react";
import BeatmapDetailsUser from "./BeatmapDetailsUser";
import UserSearcher from "../userSearcher/UserSearcher";

interface BeatmapDetailsModalProps {
  beatmap: Beatmap
  openBeatmapId: number | undefined
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

export function BeatmapDetailsModal({beatmap, openBeatmapId, setOpenBeatmapId}: BeatmapDetailsModalProps) {
  const [openUserSearcher, setOpenUserSearcher] = useState(false)

  return (
    <>
      <Modal
        closeTimeoutMS={200}
        isOpen={beatmap !== undefined && openBeatmapId !== undefined}
        onRequestClose={() => setOpenBeatmapId(undefined)}
        contentLabel="Beatmap Modal"
        className={"beatmap-details-modal"}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
      >
        <div className={"beatmap-details-container"}>
          <div className={"beatmap-banner"}
               style={{backgroundImage: `linear-gradient(to top, rgba(64, 64, 64), rgba(64, 64, 64, 0.8), rgba(64, 64, 64, 0.6), rgba(64, 64, 64, 0.4), rgba(0,0,0,0)), url(https://assets.ppy.sh/beatmaps/${beatmap?.osuId}/covers/cover.jpg)`}}/>
          <div className={"beatmap-details"}>
            <div className={"beatmap-details-sub-container beatmap-nominators-container"}>
              <div className={"beatmap-details-sub-container-title"}>
                Nominators
              </div>
              {beatmap.gamemodes.map(gamemode =>
                gamemode.nominators.map((gamemodeNominator, index) =>
                  <BeatmapDetailsUser
                    user={gamemodeNominator.nominator}
                    hasNominated={gamemodeNominator.hasNominated}
                    editable={false}
                    nominator={index + 1}
                    setOpenUserSearcher={setOpenUserSearcher}
                  />
                )
              )}
            </div>
            <div className={"beatmap-details-sub-container beatmap-metadata-container"}>
              <div className={"beatmap-details-sub-container-title"}>
                Metadata
              </div>
              <div className={"beatmap-metadata"}>
                <BeatmapDetailsMetadataField
                  value={beatmap?.artist}
                  label={"Artist"}
                />
                <BeatmapDetailsMetadataField
                  value={beatmap?.title}
                  label={"Title"}
                />
              </div>
            </div>
            <div className={"beatmap-details-sub-container beatmap-mapper-container"}>
              <div className={"beatmap-details-sub-container-title"}>
                Mapper
              </div>
              <BeatmapDetailsUser
                user={beatmap.mapper}
                editable={false}
              />
            </div>
          </div>
          <div className={"beatmap-details-sub-container beatmap-actions"}>
            <div className={"actions-row"}>
              <div className={"actions-button-group actions-button-group-left"}>
                <button onClick={() => {
                  setOpenBeatmapId(undefined)
                }} className={"button button-cancel button-text"}>
                  <ImBin2/> Delete
                </button>
              </div>
              <div className={"actions-button-group actions-button-group-right"}>
                <button onClick={() => {
                  setOpenBeatmapId(undefined)
                }} className={"button button-edit button-text"}>
                  <FaStickyNote/> Edit Nominator Note
                </button>

                <button onClick={() => {
                  setOpenBeatmapId(undefined)
                }} className={"button button-cancel button-text"}>
                  <ImCross/> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <UserSearcher
        openUserSearcher={openUserSearcher}
        setOpenUserSearcher={setOpenUserSearcher}
      />
    </>
  )
}

interface BeatmapDetailsMetadataFieldProps {
  label: string
  value: string | undefined
}

function BeatmapDetailsMetadataField({ label, value }: BeatmapDetailsMetadataFieldProps) {
  return (
    <div className={"beatmap-metadata-item"}>
      <div className={"beatmap-metadata-label"}>{label}</div>
      <p className={"beatmap-metadata-value"}>{value}</p>
    </div>
  )
}

export default BeatmapDetailsModal