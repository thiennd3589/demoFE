import { DailyTrackState } from "@daily-co/daily-js";
import {
  DailyAudioTrack,
  DailyVideo,
  useParticipant,
  useParticipantIds,
  useScreenShare,
} from "@daily-co/daily-react";
import classNames from "classnames";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { setMainSession } from "redux/videoSlice/slice";

function Video(props: {
  participantID: string;
  onClick: (session_id: string) => void;
}) {
  const info = useParticipant(props.participantID);
  return (
    info?.session_id &&
    !info.local && (
      <>
        <DailyVideo
          type={"video"}
          automirror
          sessionId={info?.session_id}
          className="rounded-xl max-h-44 mx-2"
          onClick={() => {
            props.onClick(info.session_id);
          }}
        />
        <DailyAudioTrack sessionId={info.session_id}></DailyAudioTrack>
      </>
    )
  );
}

export function ParticipantScreenShare({
  audioTrack,
  videoTrack,
  isMain,
}: {
  audioTrack: DailyTrackState;
  videoTrack: DailyTrackState;
  isMain?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const track = useMemo(() => {
    const audio = new MediaStream();
    audioTrack.track && audio.addTrack(audioTrack.track);
    const video = new MediaStream();
    videoTrack.track && video.addTrack(videoTrack.track);
    return { video, audio };
  }, [audioTrack, videoTrack]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = track.video;
    }
  }, [videoTrack, audioTrack]);

  return (
    <video
      autoPlay
      ref={videoRef}
      className={classNames("rounded-xl", {
        "max-h-44": !isMain,
      })}
    ></video>
  );
}

export default function VideoGroup() {
  const dispatch = useDispatch();
  const participantIDs = useParticipantIds({ sort: "joined_at" });
  const screenShareState = useScreenShare();
  const grid = useSelector((state: RootState) => state.layout.grid);

  const setMainVideo = (session_id: string) => {
    dispatch(setMainSession(session_id));
  };

  return grid ? (
    <>
      {participantIDs.map((id) => (
        <Video participantID={id} key={id} onClick={setMainVideo}></Video>
      ))}
      {screenShareState.screens.map((screen) => (
        <ParticipantScreenShare
          videoTrack={screen.screenVideo}
          audioTrack={screen.screenAudio}
        />
      ))}
    </>
  ) : (
    <div className="grid grid-cols-3 mt-4 gap-5">
      {participantIDs.map((id) => (
        <Video participantID={id} key={id} onClick={setMainVideo}></Video>
      ))}
      {screenShareState.screens.map((screen) => (
        <ParticipantScreenShare
          videoTrack={screen.screenVideo}
          audioTrack={screen.screenAudio}
        />
      ))}
    </div>
  );
}
