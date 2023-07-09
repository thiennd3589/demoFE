import { DailyTrackState } from "@daily-co/daily-js";
import {
  DailyAudioTrack,
  DailyVideo,
  useParticipant,
  useParticipantIds,
  useScreenShare,
} from "@daily-co/daily-react";
import { useEffect, useMemo, useRef } from "react";

function Video(props: { participantID: string }) {
  const info = useParticipant(props.participantID);
  return (
    info?.session_id &&
    !info.local && (
      <>
        <DailyVideo
          type={"video"}
          automirror
          sessionId={info?.session_id}
          className="rounded-xl max-h-44"
        />
        <DailyAudioTrack sessionId={info.session_id}></DailyAudioTrack>
      </>
    )
  );
}

function ParticipantScreenShare({
  audioTrack,
  videoTrack,
}: {
  audioTrack: DailyTrackState;
  videoTrack: DailyTrackState;
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
    <video autoPlay ref={videoRef} className="rounded-xl max-h-44"></video>
  );
}

export default function VideoGroup() {
  const participantIDs = useParticipantIds({ sort: "joined_at" });
  const screenShareState = useScreenShare();

  return (
    <div className="grid grid-cols-3 mt-4 gap-5">
      {participantIDs.map((id) => (
        <Video participantID={id} key={id}></Video>
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
