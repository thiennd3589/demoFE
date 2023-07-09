import { DailyVideo, useLocalParticipant } from "@daily-co/daily-react";

export default function Tile() {
  const localParticipant = useLocalParticipant();

  return (
    localParticipant?.session_id && (
      <>
        <DailyVideo
          type={"video"}
          automirror
          sessionId={localParticipant?.session_id}
          className="rounded-xl"
        />
      </>
    )
  );
}
