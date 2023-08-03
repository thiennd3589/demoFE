import {
  DailyVideo,
  useLocalParticipant,
  useScreenShare,
} from "@daily-co/daily-react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { ParticipantScreenShare } from "../Video";
import classNames from "classnames";

export default function Tile() {
  const mainSession = useSelector(
    (state: RootState) => state.video.mainSession
  );
  const localParticipant = useLocalParticipant();
  const screenShareState = useScreenShare();
  const grid = useSelector((state: RootState) => state.layout.grid);

  return screenShareState.screens.length > 0 ? (
    <ParticipantScreenShare
      audioTrack={screenShareState.screens[0].screenAudio}
      videoTrack={screenShareState.screens[0].screenVideo}
      isMain
    />
  ) : (
    localParticipant?.session_id && !localParticipant?.tracks?.video?.off && (
      <>
        <DailyVideo
          type={"video"}
          automirror
          sessionId={mainSession ?? localParticipant?.session_id}
          className={classNames("rounded-xl", { "max-h-44": grid })}
        />
      </>
    )
  );
}
