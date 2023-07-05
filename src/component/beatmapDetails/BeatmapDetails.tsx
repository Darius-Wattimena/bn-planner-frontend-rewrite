import BeatmapDetailsUser from "./BeatmapDetailsUser";
import {ImBin2, ImCross} from "react-icons/im";
import {FaStickyNote} from "react-icons/fa";
import React, {useState} from "react";
import {Beatmap, BeatmapGamemode, BeatmapNominator, BeatmapStatus, Gamemode, UserContext} from "../../models/Types";
import {getBeatmapStatus} from "../../utils/BeatmapUtils";
import StatusChangeBeatmapModal from "./statusChangeBeatmap/StatusChangeBeatmapModal";
import NoteChangeBeatmapModal from "./noteChangeBeatmap/NoteChangeBeatmapModal";
import {ReactComponent as OsuLogo} from "../../assets/osu.svg";
import {ReactComponent as TaikoLogo} from "../../assets/taiko.svg";
import {ReactComponent as CatchLogo} from "../../assets/catch.svg";
import {ReactComponent as ManiaLogo} from "../../assets/mania.svg";
import {sortByBeatmapGamemode} from "../beatmaps/tableView/BeatmapTableRow";

interface BeatmapDetailsProps {
  userContext: UserContext | undefined
  beatmap: Beatmap
  setBeatmap: React.Dispatch<React.SetStateAction<Beatmap | undefined>>
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  setOpenUserSearcher: React.Dispatch<React.SetStateAction<boolean>>
  setChangingGamemode: React.Dispatch<React.SetStateAction<Gamemode | undefined>>
  setChangingUser: React.Dispatch<React.SetStateAction<string | undefined>>
  onDeleteNominator: (gamemode: Gamemode, osuId: string) => void
  setOpenDeleteBeatmap: React.Dispatch<React.SetStateAction<boolean>>
  setRefreshOnClose: React.Dispatch<React.SetStateAction<boolean>>
}

function BeatmapDetails(
  {
    userContext,
    beatmap,
    setBeatmap,
    setOpenBeatmapId,
    setOpenUserSearcher,
    setChangingGamemode,
    setChangingUser,
    onDeleteNominator,
    setOpenDeleteBeatmap,
    setRefreshOnClose
  }: BeatmapDetailsProps) {
  let beatmapStatus = getBeatmapStatus(beatmap.status)

  const [isNoteChangeModelOpen, setIsNoteChangeModelOpen] = useState(false)

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
              {beatmap.status !== BeatmapStatus.Graved && userContext?.permission.osuRole === "NominationAssessment" &&
                <ChangeBeatmapStatusButton
                  beatmap={beatmap}
                  newStatus={BeatmapStatus.Graved}
                  setOpenBeatmapId={setOpenBeatmapId}
                  setRefreshOnClose={setRefreshOnClose}
                  buttonClassName={"button button-grave button-text"}>
                  <ImBin2/> Grave
                </ChangeBeatmapStatusButton>
              }

              {beatmap.status === BeatmapStatus.Graved && userContext?.permission.osuRole === "NominationAssessment" &&
                <ChangeBeatmapStatusButton
                  beatmap={beatmap}
                  newStatus={BeatmapStatus.Pending}
                  setOpenBeatmapId={setOpenBeatmapId}
                  setRefreshOnClose={setRefreshOnClose}
                  buttonClassName={"button button-grave button-text"}>
                  <ImBin2/> Ungrave
                </ChangeBeatmapStatusButton>
              }

            </div>
            <div className={"actions-button-group actions-button-group-right"}>
              <>
                <button onClick={() => {
                  setIsNoteChangeModelOpen(true)
                }} className={"button button-edit button-text"}>
                  <FaStickyNote/> Edit Note
                </button>
                <NoteChangeBeatmapModal
                  beatmap={beatmap}
                  setBeatmap={setBeatmap}
                  isModalOpen={isNoteChangeModelOpen}
                  setIsModalOpen={setIsNoteChangeModelOpen}
                  setRefreshOnClose={setRefreshOnClose} />
              </>


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

interface ChangeBeatmapStatusButtonProps {
  beatmap: Beatmap,
  newStatus: BeatmapStatus
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  buttonClassName: string
  setRefreshOnClose: React.Dispatch<React.SetStateAction<boolean>>
  children?:
    | React.ReactChild
    | React.ReactChild[]
}

function ChangeBeatmapStatusButton(
  {
    beatmap,
    newStatus,
    setOpenBeatmapId,
    buttonClassName,
    setRefreshOnClose,
    children
  }: ChangeBeatmapStatusButtonProps) {
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false)

  return (
    <>
      <button onClick={() => {
        setIsChangeModalOpen(true)
      }} className={buttonClassName}>
        {children}
      </button>
      <StatusChangeBeatmapModal
        key={`beatmap-${beatmap.osuId}status-change-${newStatus}`}
        beatmap={beatmap}
        newStatus={newStatus}
        isChangeModalOpen={isChangeModalOpen}
        setIsChangeModalOpen={setIsChangeModalOpen}
        setOpenBeatmapId={setOpenBeatmapId}
        setRefreshOnClose={setRefreshOnClose}
       />
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
  const sortedGamemodes = beatmap.gamemodes.sort(sortByBeatmapGamemode)
  const [showingGamemode, setShowingGamemode] = useState(sortedGamemodes[0])
  let beatmapGamemodes = beatmap.gamemodes
  let missingGamemodes = getMissingGamemodes(beatmapGamemodes)

  function getMissingGamemodes(beatmapGamemodes: BeatmapGamemode[]) {
    let gamemodes = beatmapGamemodes.map(it => it.gamemode)
    let missingGamemodes = []

    if (!gamemodes.includes(Gamemode.Osu)) {
      missingGamemodes.push(createMissingGamemode(Gamemode.Osu))
    }
    if (!gamemodes.includes(Gamemode.Taiko)) {
      missingGamemodes.push(createMissingGamemode(Gamemode.Taiko))
    }
    if (!gamemodes.includes(Gamemode.Catch)) {
      missingGamemodes.push(createMissingGamemode(Gamemode.Catch))
    }
    if (!gamemodes.includes(Gamemode.Mania)) {
      missingGamemodes.push(createMissingGamemode(Gamemode.Mania))
    }

    return missingGamemodes
  }

  function createMissingGamemode(gamemode: Gamemode) {
    let missingNominator = {
      nominator: {
        osuId: "0",
        username: "None",
        gamemodes: []
      },
      hasNominated: false
    } as BeatmapNominator

    return {
      gamemode: gamemode,
      nominators: [missingNominator, missingNominator],
      isReady: false
    } as BeatmapGamemode
  }

  return (
    <div>
      <div className={"beatmap-modes"}>
        {beatmapGamemodes.concat(missingGamemodes).sort(sortByBeatmapGamemode).map(beatmapGamemode => {
          let gamemodeText = <></>
          let isSelectedMode = showingGamemode.gamemode == beatmapGamemode.gamemode

          if (beatmapGamemode.gamemode == Gamemode.Osu) {
            gamemodeText = <OsuLogo/>
          } else if (beatmapGamemode.gamemode == Gamemode.Taiko) {
            gamemodeText = <TaikoLogo/>
          } else if (beatmapGamemode.gamemode == Gamemode.Catch) {
            gamemodeText = <CatchLogo/>
          } else if (beatmapGamemode.gamemode == Gamemode.Mania) {
            gamemodeText = <ManiaLogo/>
          }

          return (
            <div
              key={`beatmap-details-gamemode-${beatmapGamemode.gamemode}`}
              className={"beatmap-mode-icon" + (isSelectedMode ? " active" : "")}
              onClick={() => setShowingGamemode(beatmapGamemode)}
            >
              {gamemodeText}
            </div>
          )
        })}
      </div>
      {showingGamemode.nominators.map((gamemodeNominator, index) =>
        <BeatmapDetailsUser
          key={`${showingGamemode.gamemode}-${index}`}
          user={gamemodeNominator.nominator}
          hasNominated={gamemodeNominator.hasNominated}
          editable={!gamemodeNominator.hasNominated}
          deletable={!gamemodeNominator.hasNominated}
          nominator={index + 1}
          setOpenUserSearcher={setOpenUserSearcher}
          gamemode={showingGamemode.gamemode}
          setChangingGamemode={setChangingGamemode}
          setChangingUser={setChangingUser}
          onDeleteNominator={onDeleteNominator}
        />
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