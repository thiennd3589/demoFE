import Splash from "components/Splash";
import { MeetModel } from "interface/Meet";
import moment from "moment";
import { BiVideoRecording } from "react-icons/bi";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { REQUEST_METHOD, query } from "utils/httpClients";
import { DailyProvider, useDaily } from "@daily-co/daily-react";
import { useContext, useEffect, useRef, useState } from "react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import ParticipantNumber from "./ParticipantNumber";
import Tile from "./MainVideo";
import Participants from "./Participants";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import VideoGroup from "./Video";
import Actions from "./Actions";
import MeetLayout from "./MeetLayout";
import { Messages } from "./Messages";
import classNames from "classnames";
import { SocketContext } from "context/SocketProvider";
import Board from "./Board";

interface MeetProps extends MeetModel {}

function Meet(props: MeetProps) {
  const { socket } = useContext(SocketContext);
  const { meetId } = useParams();
  const init = useRef(false);
  const fullscreen = useSelector((state: RootState) => state.layout.fullscreen);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const grid = useSelector((state: RootState) => state.layout.grid);
  const daily = useDaily();
  const { mutate } = useMutation(
    "join-meet",
    ({ meet_id, user_id }: { meet_id: number; user_id: number }) => {
      return query({
        url: "/join/meet",
        method: REQUEST_METHOD.POST,
        tokenRequired: true,
        data: { user_id, meet_id },
      });
    }
  );

  useEffect(() => {
    console.log(socket);
    if (socket) {
      socket.emit("join", { meet_id: meetId });
    }
  }, [socket]);

  useEffect(() => {
    if (userInfo) {
      if (init.current === false) {
        mutate({ meet_id: parseInt(meetId!), user_id: userInfo.id });
        init.current = true;
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      daily?.join({ userName: `${userInfo?.lastName} ${userInfo?.firstName}` });
    }
  }, [userInfo]);

  daily?.accessState;

  return (
    <div className="flex p-5">
      <div
        className="flex flex-col bg-gray-100 p-5 rounded-xl gap-5"
        style={{ flex: "2" }}
      >
        <div className="flex gap-5 items-center cursor-pointer">
          <div className="p-3 bg-blue-500 rounded-full flex justify-center items-center">
            <BiVideoRecording size={30} className={"text-white"} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-blue-500">FindMeet</span>
            <span className="text-sm text-gray-500">
              {moment(props.startTime).format("DD/MM/YYYY")}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <ParticipantNumber />
          <MeetLayout />
        </div>
        <div className={classNames("flex", { "flex-col": !grid })}>
          <Tile />
          <VideoGroup />
        </div>
        <Actions />
      </div>
      <div
        className={classNames(
          "pt-10 px-10 transition-all duration-200 ease-linear flex-1",
          { "!w-0 overflow-hidden flex-none !p-0": fullscreen }
        )}
      >
        <Participants />
        <Messages />
      </div>
      <Board />
    </div>
  );
}

export default function MeetScreen() {
  const [callObject, setCallObject] = useState<DailyCall>();
  const { meetId } = useParams();
  const { data, isLoading } = useQuery(
    ["meet", meetId],
    async () => {
      return query<never, MeetModel>({
        method: REQUEST_METHOD.GET,
        url: `/meet/${meetId}`,
        tokenRequired: true,
      });
    },
    {
      onSuccess: (data) => {
        if (!!callObject) {
          return;
        } else {
          setCallObject(DailyIframe.createCallObject({ url: data.data.url }));
        }
      },
    }
  );

  return isLoading ? (
    <Splash />
  ) : (
    <DailyProvider callObject={callObject}>
      <Meet {...data?.data!} />
    </DailyProvider>
  );
}
