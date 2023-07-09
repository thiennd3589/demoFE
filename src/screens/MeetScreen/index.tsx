import Splash from "components/Splash";
import { MeetModel } from "interface/Meet";
import moment from "moment";
import { BiVideoRecording } from "react-icons/bi";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { REQUEST_METHOD, query } from "utils/httpClients";
import { DailyProvider, useDaily } from "@daily-co/daily-react";
import { useEffect, useState } from "react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import ParticipantNumber from "./ParticipantNumber";
import Tile from "./MainVideo";
import Participants from "./Participants";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import VideoGroup from "./Video";
import { Space } from "antd";
import Actions from "./Actions";
import MeetLayout from "./MeetLayout";

interface MeetProps extends MeetModel {}

function Meet(props: MeetProps) {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const daily = useDaily();

  useEffect(() => {
    daily?.join({ userName: `${userInfo?.lastName} ${userInfo?.firstName}` });
  }, []);

  return (
    <div className="flex p-5">
      <div
        className="flex flex-col bg-gray-100 p-5 rounded-xl gap-5"
        style={{ flex: "2 " }}
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
        <div className="flex flex-col">
          <Tile />
          <VideoGroup />
          <Actions />
        </div>
      </div>
      <div className="pt-10 px-10" style={{ flex: 1 }}>
        <Participants />
      </div>
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
