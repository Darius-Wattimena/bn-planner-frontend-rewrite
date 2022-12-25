import {Beatmap, Gamemode, UserContext} from "../../models/Types";
import Modal from "react-modal";
import React, {useEffect, useState} from "react";
import BeatmapDetails from "./BeatmapDetails";
import UserSearcher from "../userSearcher/UserSearcher";
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import DeleteBeatmapModal from "./deleteBeatmap/DeleteBeatmapModal";

interface BeatmapDetailsModalProps {
  userContext: UserContext | undefined
  beatmap: Beatmap | undefined
  setBeatmap: React.Dispatch<React.SetStateAction<Beatmap | undefined>>
  loading: boolean
  openBeatmapId: number | undefined
  setOpenBeatmapId: React.Dispatch<React.SetStateAction<number | undefined>>
  setRefreshOnClose: React.Dispatch<React.SetStateAction<boolean>>
}

function BeatmapDetailsModal(
  {
    userContext,
    beatmap,
    loading,
    setBeatmap,
    openBeatmapId,
    setOpenBeatmapId,
    setRefreshOnClose
  }: BeatmapDetailsModalProps) {
  const [openUserSearcher, setOpenUserSearcher] = useState(false)
  const [openDeleteBeatmap, setOpenDeleteBeatmap] = useState(false)
  const [changingGamemode, setChangingGamemode] = useState<Gamemode>()
  const [changingUser, setChangingUser] = useState<string>()
  const [{data}, execute] = useAxios<Beatmap>("", {manual: true})

  let key = undefined;
  if (beatmap) {
    key = beatmap.osuId.toString() + beatmap.gamemodes.map(gamemode => gamemode.nominators.map(nominator => nominator.nominator.osuId).join("-")).join("-")
  }

  function onDeleteNominator(gamemode: Gamemode, osuId: string) {
    if (beatmap) {
      execute(Api.updateNominator(beatmap.osuId, gamemode, osuId, "0"))
    }
  }

  useEffect(() => {
    setBeatmap(data)
  }, [data])

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
          userContext={userContext}
          beatmap={beatmap}
          setBeatmap={setBeatmap}
          setOpenBeatmapId={setOpenBeatmapId}
          setOpenUserSearcher={setOpenUserSearcher}
          setChangingGamemode={setChangingGamemode}
          setChangingUser={setChangingUser}
          onDeleteNominator={onDeleteNominator}
          setOpenDeleteBeatmap={setOpenDeleteBeatmap}
          setRefreshOnClose={setRefreshOnClose}
        />
        }
      </Modal>

      {beatmap &&
        <>
          <UserSearcher
            openUserSearcher={openUserSearcher}
            setOpenUserSearcher={setOpenUserSearcher}
            setBeatmap={setBeatmap}
            beatmapGamemodes={beatmap.gamemodes}
            changingGamemode={changingGamemode}
            changingUserId={changingUser}
            beatmapId={beatmap.osuId}
          />
          <DeleteBeatmapModal
            beatmap={beatmap}
            openDeleteBeatmap={openDeleteBeatmap}
            setOpenDeleteBeatmap={setOpenDeleteBeatmap}
            setOpenBeatmapId={setOpenBeatmapId}
          />
        </>
      }
    </>
  )
}

export default BeatmapDetailsModal