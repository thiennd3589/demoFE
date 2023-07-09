import { DailyMeetingSession } from "@daily-co/daily-js";
import { useParticipantCounts } from "@daily-co/daily-react";
import { FaPlus, FaUserFriends } from "react-icons/fa";

interface ParticipantNumberProps {
  session?: DailyMeetingSession;
}

export default function ParticipantNumber(props: ParticipantNumberProps) {
  const { present, hidden } = useParticipantCounts();

  return (
    <div className="flex gap-3">
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-3xl text-gray-500">
        <FaUserFriends size={20} />
        <span className="text-sm">{present + hidden}</span>
      </div>
      <div className="flex items-center gap-2 bg-green-400 px-4 py-2 rounded-3xl text-white cursor-pointer">
        <FaPlus size={20} />
        <span className="text-sm">Thêm thành viên</span>
      </div>
    </div>
  );
}
