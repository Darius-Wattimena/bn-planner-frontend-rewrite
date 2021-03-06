import BeatmapDetailsUser from "./BeatmapDetailsUser";
import {ImBin2, ImCross} from "react-icons/im";
import {FaStickyNote} from "react-icons/fa";
import React from "react";
import {Beatmap, Gamemode} from "../../models/Types";
import useAxios from "axios-hooks";
import {getBeatmapStatus} from "../../utils/BeatmapUtils";

interface BeatmapDetailsProps {
  beatmap: Beatmap
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  setOpenUserSearcher: React.Dispatch<React.SetStateAction<boolean>>
  setChangingGamemode: React.Dispatch<React.SetStateAction<Gamemode | undefined>>
  setChangingUser: React.Dispatch<React.SetStateAction<string | undefined>>
  onDeleteNominator: (gamemode: Gamemode, osuId: string) => void
  setOpenDeleteBeatmap: React.Dispatch<React.SetStateAction<boolean>>
}

function BeatmapDetails(
  {
    beatmap,
    setOpenBeatmapId,
    setOpenUserSearcher,
    setChangingGamemode,
    setChangingUser,
    onDeleteNominator,
    setOpenDeleteBeatmap
  }: BeatmapDetailsProps) {
  let beatmapStatus = getBeatmapStatus(beatmap.status)

  return (
    <>
      <div className={"beatmap-details-container"}>
        <div
          className={"beatmap-banner"}
          style={{background: `linear-gradient(to top, rgb(64, 64, 64), rgba(64, 64, 64, 0.8), rgba(64, 64, 64, 0.6), rgba(64, 64, 64, 0.4), rgba(0,0,0,0)), url(https://assets.ppy.sh/beatmaps/${beatmap?.osuId}/covers/cover.jpg)`}}
        />
        <div className={"beatmap-details"}>
          <div className={"beatmap-details-sub-container beatmap-nominators-container"}>
            <div className={"beatmap-details-sub-container-title"}>
              Nominators
            </div>
            <BeatmapDetailsNominators
              beatmap={beatmap}
              setOpenUserSearcher={setOpenUserSearcher}
              setChangingGamemode={setChangingGamemode}
              setChangingUser={setChangingUser}
              onDeleteNominator={onDeleteNominator}
            />
          </div>
          <div className={"beatmap-details-sub-container beatmap-metadata-container"}>
            <div className={"beatmap-details-sub-container-title"}>
              Beatmap
            </div>
            <div className={"beatmap-metadata"}>
              <BeatmapDetailsMetadataField
                value={beatmap.artist}
                label={"Artist"}
              />
              <BeatmapDetailsMetadataField
                value={beatmap.title}
                label={"Title"}
              />
              <div className={"beatmap-metadata-item beatmap-status"}>
                <div className={"beatmap-metadata-label"}>Status</div>
                <div className={`beatmap-status-label ${beatmapStatus.className}`}>{beatmapStatus.name}</div>
              </div>
              <div className={"beatmap-metadata-item beatmap-note"}>
                <div className={"beatmap-metadata-label"}>Note</div>
                <div className={"beatmap-metadata-value"}>{beatmap.note !== "" ? beatmap.note : "-"}</div>
              </div>
            </div>
          </div>
          <div className={"beatmap-details-sub-container beatmap-mapper-container"}>
            <div className={"beatmap-details-sub-container-title"}>
              Mapper
            </div>
            <BeatmapDetailsUser
              user={beatmap.mapper}
              editable={false}
              deletable={false}
            />
          </div>
        </div>
        <div className={"beatmap-details-sub-container beatmap-actions"}>
          <div className={"actions-row"}>
            <div className={"actions-button-group actions-button-group-left"}>
              <button onClick={() => {
                setOpenDeleteBeatmap(true)
              }} className={"button button-cancel button-text"}>
                <ImBin2/> Delete
              </button>
            </div>
            <div className={"actions-button-group actions-button-group-right"}>
              <button disabled onClick={() => {
                setOpenBeatmapId(undefined)
              }} className={"button button-edit button-text"}>
                <FaStickyNote/> Edit Note
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
    </>
  )
}

interface BeatmapDetailsNominatorsProps {
  beatmap: Beatmap
  setOpenUserSearcher: React.Dispatch<React.SetStateAction<boolean>>
  setChangingGamemode: React.Dispatch<React.SetStateAction<Gamemode | undefined>>
  setChangingUser: React.Dispatch<React.SetStateAction<string | undefined>>
  onDeleteNominator: (gamemode: Gamemode, osuId: string) => void
}

function BeatmapDetailsNominators(
  {
    beatmap,
    setOpenUserSearcher,
    setChangingGamemode,
    setChangingUser,
    onDeleteNominator
  }: BeatmapDetailsNominatorsProps) {
  return (
    <div>
      {beatmap.gamemodes.map((gamemode, gamemodeIndex) =>
        gamemode.nominators.map((gamemodeNominator, index) =>
          <BeatmapDetailsUser
            key={`${gamemodeIndex}-${index}`}
            user={gamemodeNominator.nominator}
            hasNominated={gamemodeNominator.hasNominated}
            editable={!gamemodeNominator.hasNominated}
            deletable={!gamemodeNominator.hasNominated}
            nominator={index + 1}
            setOpenUserSearcher={setOpenUserSearcher}
            gamemode={gamemode.gamemode}
            setChangingGamemode={setChangingGamemode}
            setChangingUser={setChangingUser}
            onDeleteNominator={onDeleteNominator}
          />
        )
      )}
    </div>
  )
}

interface BeatmapDetailsMetadataFieldProps {
  label: string
  value: string
}

function BeatmapDetailsMetadataField({label, value}: BeatmapDetailsMetadataFieldProps) {
  return (
    <div className={"beatmap-metadata-item"}>
      <div className={"beatmap-metadata-label"}>{label}</div>
      <div className={"beatmap-metadata-value"}>{value !== "" ? value : "-"}</div>
    </div>
  )
}

export default BeatmapDetails