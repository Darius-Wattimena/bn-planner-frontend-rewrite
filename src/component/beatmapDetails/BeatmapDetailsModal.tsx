import {Beatmap, Gamemode} from "../../models/Types";
import Modal from "react-modal";
import React, {useState} from "react";
import BeatmapDetails from "./BeatmapDetails";
import UserSearcher from "../userSearcher/UserSearcher";

interface BeatmapDetailsModalProps {
  beatmap: Beatmap | undefined
  setBeatmap: React.Dispatch<React.SetStateAction<Beatmap | undefined>>
  loading: boolean
  openBeatmapId: number | undefined
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
}

export function BeatmapDetailsModal(
  {
    beatmap,
    loading,
    setBeatmap,
    openBeatmapId,
    setOpenBeatmapId
  }: BeatmapDetailsModalProps) {
  const [openUserSearcher, setOpenUserSearcher] = useState(false)
  const [changingGamemode, setChangingGamemode] = useState<Gamemode>()
  const [changingUser, setChangingUser] = useState<string>()
  let key = undefined;
  if (beatmap) {
    key = beatmap.osuId.toString() + beatmap.gamemodes.map(gamemode => gamemode.nominators.map(nominator => nominator.nominator.osuId).join("-")).join("-")
  }

  return (
    <>
      <Modal
        closeTimeoutMS={200}
        isOpen={openBeatmapId !== undefined}
        onRequestClose={() => setOpenBeatmapId(undefined)}
        contentLabel="Beatmap Modal"
        className={"beatmap-details-modal"}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
      >
        {beatmap &&
        <BeatmapDetails
          key={key}
          beatmap={beatmap} setOpenBeatmapId={setOpenBeatmapId}
          setOpenUserSearcher={setOpenUserSearcher}
          setChangingGamemode={setChangingGamemode}
          setChangingUser={setChangingUser}
        />
        }
      </Modal>

      {beatmap &&
      <UserSearcher
        openUserSearcher={openUserSearcher}
        setOpenUserSearcher={setOpenUserSearcher}
        setBeatmap={setBeatmap}
        beatmapGamemodes={beatmap.gamemodes}
        changingGamemode={changingGamemode}
        changingUserId={changingUser}
        beatmapId={beatmap.osuId}
      />
      }
    </>
  )
}

export default BeatmapDetailsModal