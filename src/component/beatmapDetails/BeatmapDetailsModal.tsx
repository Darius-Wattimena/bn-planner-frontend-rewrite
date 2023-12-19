import {Beatmap, Gamemode, UserContext} from "../../models/Types";
import Modal from "react-modal";
import React, {useEffect, useState} from "react";
import BeatmapDetails from "./BeatmapDetails";
import UserSearcher from "../userSearcher/UserSearcher";
import useAxios from "axios-hooks";
import Api from "../../resources/Api";
import DeleteBeatmapModal from "./deleteBeatmap/DeleteBeatmapModal";
import SyncBeatmapModal from "./syncBeatmap/SyncBeatmapModal";

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
  const [openSyncBeatmap, setOpenSyncBeatmap] = useState(false)
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
    if (beatmap) {
      let isInitialLoad = data === undefined

      // Set the changingGamemode when can't find it anymore, meaning it has been removed from the mapset
      // Or on the first load to ensure one is selected
      if (isInitialLoad || (!isInitialLoad && !beatmap.gamemodes.find(it => it.gamemode === changingGamemode))) {
        setChangingGamemode(beatmap.gamemodes[0].gamemode)
      }
    }
  }, [beatmap])

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
          changingGamemode={changingGamemode}
          setBeatmap={setBeatmap}
          setOpenBeatmapId={setOpenBeatmapId}
          setOpenUserSearcher={setOpenUserSearcher}
          setChangingGamemode={setChangingGamemode}
          setChangingUser={setChangingUser}
          onDeleteNominator={onDeleteNominator}
          setOpenDeleteBeatmap={setOpenDeleteBeatmap}
          setOpenSyncBeatmap={setOpenSyncBeatmap}
          setRefreshOnClose={setRefreshOnClose}
        />
        }
      </Modal>

      {beatmap &&
        <>
          <UserSearcher
            currentUser={userContext?.user}
            openUserSearcher={openUserSearcher}
            setOpenUserSearcher={setOpenUserSearcher}
            beatmapGamemodes={beatmap.gamemodes}
            changingGamemode={changingGamemode}
            changingUserId={changingUser}
            beatmapId={beatmap.osuId}
            execute={execute}
          />
          <DeleteBeatmapModal
            beatmap={beatmap}
            openDeleteBeatmap={openDeleteBeatmap}
            setOpenDeleteBeatmap={setOpenDeleteBeatmap}
            setOpenBeatmapId={setOpenBeatmapId}
            setRefreshOnClose={setRefreshOnClose}
          />
          <SyncBeatmapModal
            beatmap={beatmap}
            openSyncBeatmap={openSyncBeatmap}
            setOpenSyncBeatmap={setOpenSyncBeatmap}
            setOpenBeatmapId={setOpenBeatmapId}
            setRefreshOnClose={setRefreshOnClose}
          />
        </>
      }
    </>
  )
}

export default BeatmapDetailsModal