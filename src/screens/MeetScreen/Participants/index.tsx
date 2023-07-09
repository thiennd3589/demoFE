import { useParticipant, useParticipantIds } from "@daily-co/daily-react";
import { AiOutlineUser } from "react-icons/ai";
import { FaCamera, FaMicrophone } from "react-icons/fa";
import { BiCameraOff, BiMicrophoneOff } from "react-icons/bi";
import classNames from "classnames";

const ParticipantsItem = (props: { participantID: string }) => {
  const info = useParticipant(props.participantID);
  console.log(info?.tracks.audio.off);

  return (
    <div
      className={classNames(
        "flex mt-5 justify-between items-center p-3 pr-5 rounded-full",
        { "bg-gray-200": info?.local }
      )}
    >
      <div className="flex items-center gap-2">
        <div className="bg-gray-300 text-white p-3 rounded-full">
          <AiOutlineUser size={15} />
        </div>
        <span className="text-sm">{info?.local ? "Tôi" : info?.user_name}</span>
      </div>
      <div className="flex gap-5 items-center">
        {info?.tracks.audio.off ? (
          <BiMicrophoneOff size={20} className={"text-gray-600"} />
        ) : (
          <FaMicrophone size={20} className={"text-gray-600"} />
        )}
        {info?.tracks.video.off ? (
          <BiCameraOff size={20} className={"text-gray-600"} />
        ) : (
          <FaCamera size={20} className={"text-gray-600"} />
        )}
      </div>
    </div>
  );
};

export default function Participants() {
  const participantIDs = useParticipantIds({ sort: "joined_at" });

  return (
    <div className="flex flex-col max-h-screen">
      <div className="flex items-center justify-between">
        <span className="text-2xl relative font-bold">
          Thành viên
          <span className="absolute bg-blue-500 text-white text-xs py-1 px-2 rounded-xl -top-2">
            {participantIDs.length}
          </span>
        </span>
        <span className="text-gray-500 hover:text-gray-600 cursor-pointer">
          Tất cả
        </span>
      </div>
      <div className="flex flex-col">
        {participantIDs.map((id) => (
          <ParticipantsItem participantID={id} key={id} />
        ))}
      </div>
    </div>
  );
}
