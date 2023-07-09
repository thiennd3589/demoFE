import {
  useDaily,
  useLocalParticipant,
  useScreenShare,
} from "@daily-co/daily-react";
import { useRef } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import { BiCameraOff, BiMicrophoneOff } from "react-icons/bi";
import { FaCamera, FaMicrophone } from "react-icons/fa";
import { TbScreenShare } from "react-icons/tb";

export default function Actions() {
  const daily = useDaily();
  const media = useRef({ audio: true, video: true });
  const localParticipant = useLocalParticipant();
  const screenShareState = useScreenShare();

  const onToggleMedia = (type: "audio" | "video") => {
    if (type === "audio") {
      daily?.setLocalAudio(!media.current.audio);
      media.current.audio = !media.current.audio;
      return;
    }

    daily?.setLocalVideo(!media.current.video);
    media.current.video = !media.current.video;
  };

  return (
    <div className="flex gap-5 justify-center mt-5 items-center">
      <div
        className="p-4 bg-white rounded-full text-gray-500 cursor-pointer"
        onClick={() => {}}
      >
        <BsArrowsFullscreen size={15} className={"text-gray-600"} />
      </div>
      <div
        className="p-4 bg-white rounded-full text-gray-500 cursor-pointer"
        onClick={() => {
          onToggleMedia("audio");
        }}
      >
        {localParticipant?.tracks.audio.off ? (
          <BiMicrophoneOff size={15} className={"text-gray-600"} />
        ) : (
          <FaMicrophone size={15} className={"text-gray-600"} />
        )}
      </div>
      <span className="text-white px-5 py-2 bg-red-500 rounded-full">
        Kết thúc
      </span>
      <div
        className="p-4 bg-white rounded-full text-gray-500 cursor-pointer"
        onClick={() => {
          onToggleMedia("video");
        }}
      >
        {localParticipant?.tracks.video.off ? (
          <BiCameraOff size={15} className={"text-gray-600"} />
        ) : (
          <FaCamera size={15} className={"text-gray-600"} />
        )}
      </div>
      <div
        className="p-4 bg-white rounded-full text-gray-500 cursor-pointer"
        onClick={() => {
          if (screenShareState.isSharingScreen) {
            screenShareState.stopScreenShare();
            return;
          }
          screenShareState.startScreenShare();
        }}
      >
        <TbScreenShare size={15} className={"text-gray-600"} />
      </div>
    </div>
  );
}
