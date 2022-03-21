import BeatmapDetailsUser from "./BeatmapDetailsUser";
import {ImBin2, ImCross} from "react-icons/im";
import {FaStickyNote} from "react-icons/fa";
import React from "react";
import {Beatmap, Gamemode} from "../../models/Types";

interface BeatmapDetailsProps {
  beatmap: Beatmap
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  setOpenUserSearcher: React.Dispatch<React.SetStateAction<boolean>>
  setChangingGamemode: React.Dispatch<React.SetStateAction<Gamemode | undefined>>
  setChangingUser: React.Dispatch<React.SetStateAction<string | undefined>>
}

function BeatmapDetails(
  {
    beatmap,
    setOpenBeatmapId,
    setOpenUserSearcher,
    setChangingGamemode,
    setChangingUser,
  }: BeatmapDetailsProps) {
  return (
    <>
      <div className={"beatmap-details-container"}>
        <div className={"beatmap-banner"}
             style={{background: `linear-gradient(to top, rgba(64, 64, 64), rgba(64, 64, 64, 0.8), rgba(64, 64, 64, 0.6), rgba(64, 64, 64, 0.4), rgba(0,0,0,0)), url(https://assets.ppy.sh/beatmaps/${beatmap?.osuId}/covers/cover.jpg)`}}/>
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
            />
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
    </>
  )
}

interface BeatmapDetailsNominatorsProps {
  beatmap: Beatmap
  setOpenUserSearcher: React.Dispatch<React.SetStateAction<boolean>>
  setChangingGamemode: React.Dispatch<React.SetStateAction<Gamemode | undefined>>
  setChangingUser: React.Dispatch<React.SetStateAction<string | undefined>>
}

function BeatmapDetailsNominators(
  {
    beatmap,
    setOpenUserSearcher,
    setChangingGamemode,
    setChangingUser
  }: BeatmapDetailsNominatorsProps) {
  return (
    <div>
      {beatmap.gamemodes.map((gamemode, gamemodeIndex) =>
        gamemode.nominators.map((gamemodeNominator, index) =>
          <BeatmapDetailsUser
            key={`${gamemodeIndex}-${index}`}
            user={gamemodeNominator.nominator}
            hasNominated={gamemodeNominator.hasNominated}
            editable={false}
            nominator={index + 1}
            setOpenUserSearcher={setOpenUserSearcher}
            gamemode={gamemode.gamemode}
            setChangingGamemode={setChangingGamemode}
            setChangingUser={setChangingUser}
          />
        )
      )}
    </div>
  )
}

interface BeatmapDetailsMetadataFieldProps {
  label: string
  value: string | undefined
}

function BeatmapDetailsMetadataField({label, value}: BeatmapDetailsMetadataFieldProps) {
  return (
    <div className={"beatmap-metadata-item"}>
      <div className={"beatmap-metadata-label"}>{label}</div>
      <p className={"beatmap-metadata-value"}>{value}</p>
    </div>
  )
}

export default BeatmapDetails